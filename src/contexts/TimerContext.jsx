import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { db, firebaseEnabled } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getTempUserId } from '../utils/tempUser'

const SESSION_TYPES = {
  WORK: { duration: 25 * 60, label: 'Work', color: 'from-rose-500 to-orange-500' },
  SHORT_BREAK: { duration: 5 * 60, label: 'Short Break', color: 'from-teal-500 to-cyan-500' },
  LONG_BREAK: { duration: 15 * 60, label: 'Long Break', color: 'from-purple-500 to-pink-500' }
}

const TimerContext = createContext()

export function TimerProvider({ children }) {
  const [sessionType, setSessionType] = useState('WORK')
  const [timeLeft, setTimeLeft] = useState(SESSION_TYPES.WORK.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const intervalRef = useRef(null)

  const currentSession = SESSION_TYPES[sessionType]

  // Save completed session to Firestore
  const saveSession = async (type, startTime, endTime, duration) => {
    // Skip if Firebase is not configured
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
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        date: new Date().toISOString().split('T')[0],
        completed: true
      }

      await addDoc(collection(db, 'users', userId, 'sessions'), sessionData)
      console.log('Session saved to Firestore:', sessionData)
    } catch (error) {
      console.error('Error saving session to Firestore:', error)
    }
  }

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            const endTime = new Date().toISOString()

            if (sessionStartTime) {
              saveSession(
                currentSession.label,
                sessionStartTime,
                endTime,
                currentSession.duration
              )
            }

            if (sessionType === 'WORK') {
              setCompletedSessions(count => count + 1)
            }

            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, sessionType, sessionStartTime, currentSession])

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentSession.duration)
    }
    if (!isRunning) {
      setSessionStartTime(new Date().toISOString())
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
  }

  const handleSessionChange = (type) => {
    setSessionType(type)
    setTimeLeft(SESSION_TYPES[type].duration)
    setIsRunning(false)
    setSessionStartTime(null)
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

export function useTimer() {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
}
