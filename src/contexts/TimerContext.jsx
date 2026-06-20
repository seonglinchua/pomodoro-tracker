import { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react'
import { db, firebaseEnabled } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getTempUserId } from '../utils/tempUser'

const SESSION_TYPES = {
  WORK: { duration: 25 * 60, label: 'Work', color: 'from-rose-500 to-orange-500' },
  SHORT_BREAK: { duration: 5 * 60, label: 'Short Break', color: 'from-teal-500 to-cyan-500' },
  LONG_BREAK: { duration: 15 * 60, label: 'Long Break', color: 'from-purple-500 to-pink-500' }
}

const STORAGE_KEYS = {
  sessionType: 'pomodoroSessionType',
  completedSessions: 'pomodoroCompletedSessions'
}

// localStorage can throw (private mode, quota, disabled) — keep reads/writes safe
const readStorage = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage errors so the timer keeps working without persistence
  }
}

const getInitialSessionType = () => {
  const saved = readStorage(STORAGE_KEYS.sessionType)
  return saved && SESSION_TYPES[saved] ? saved : 'WORK'
}

const getInitialCompletedSessions = () => {
  const saved = parseInt(readStorage(STORAGE_KEYS.completedSessions), 10)
  return Number.isFinite(saved) && saved >= 0 ? saved : 0
}

const TimerContext = createContext()

export function TimerProvider({ children }) {
  const [sessionType, setSessionType] = useState(getInitialSessionType)
  const [timeLeft, setTimeLeft] = useState(() => SESSION_TYPES[getInitialSessionType()].duration)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(getInitialCompletedSessions)
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const intervalRef = useRef(null)
  const endTimeRef = useRef(null)
  const sessionSavedRef = useRef(false)

  const currentSession = SESSION_TYPES[sessionType]

  // Persist lightweight state so a reload keeps your session type and count
  useEffect(() => {
    writeStorage(STORAGE_KEYS.sessionType, sessionType)
  }, [sessionType])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.completedSessions, String(completedSessions))
  }, [completedSessions])

  // Save a completed session to Firestore (no-op when Firebase isn't configured)
  const saveSession = useCallback(async (type, startTime, endTime, duration) => {
    if (!firebaseEnabled || !db) {
      console.log('Firebase not available. Session data:', {
        type: type.toLowerCase(),
        startTime,
        endTime,
        duration,
        date: new Date().toISOString().split('T')[0]
      })
      return
    }

    try {
      const userId = getTempUserId()
      const sessionData = {
        type: type.toLowerCase(),
        startTime,
        endTime,
        duration,
        date: new Date().toISOString().split('T')[0],
        completed: true
      }

      await addDoc(collection(db, 'users', userId, 'sessions'), sessionData)
      console.log('Session saved to Firestore:', sessionData)
    } catch (error) {
      console.error('Error saving session to Firestore:', error)
    }
  }, [])

  // Countdown driven by a target timestamp so it stays accurate even when the
  // tab is backgrounded (setInterval is throttled there and would otherwise drift).
  useEffect(() => {
    if (!isRunning) {
      return
    }

    endTimeRef.current = Date.now() + timeLeft * 1000
    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) {
        setIsRunning(false)
      }
    }, 250)

    return () => {
      clearInterval(intervalRef.current)
    }
    // timeLeft is intentionally excluded: the ticker should only (re)start when the
    // running state flips, not on every tick. The end timestamp is captured on start.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])

  // Record the completed session exactly once when the countdown reaches zero.
  // Running this here (instead of inside a state updater) keeps it safe under
  // StrictMode's double-invoked updaters, which previously caused double saves.
  useEffect(() => {
    if (timeLeft > 0 || !sessionStartTime || sessionSavedRef.current) {
      return
    }

    sessionSavedRef.current = true
    const endTime = new Date().toISOString()
    saveSession(currentSession.label, sessionStartTime, endTime, currentSession.duration)
    if (sessionType === 'WORK') {
      setCompletedSessions((count) => count + 1)
    }
  }, [timeLeft, sessionStartTime, sessionType, currentSession, saveSession])

  const handleStart = () => {
    if (timeLeft === 0) {
      // Starting a brand new session after the previous one completed
      setTimeLeft(currentSession.duration)
      setSessionStartTime(new Date().toISOString())
      sessionSavedRef.current = false
    } else if (!sessionStartTime) {
      // First start of a fresh session (resuming from pause keeps the original start)
      setSessionStartTime(new Date().toISOString())
      sessionSavedRef.current = false
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(currentSession.duration)
    setSessionStartTime(null)
    sessionSavedRef.current = false
  }

  const handleSessionChange = (type) => {
    setSessionType(type)
    setTimeLeft(SESSION_TYPES[type].duration)
    setIsRunning(false)
    setSessionStartTime(null)
    sessionSavedRef.current = false
  }

  const value = {
    sessionType,
    timeLeft,
    isRunning,
    completedSessions,
    currentSession,
    SESSION_TYPES,
    handleStart,
    handlePause,
    handleReset,
    handleSessionChange
  }

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimer() {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
}
