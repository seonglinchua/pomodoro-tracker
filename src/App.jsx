import { useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getTempUserId } from './utils/tempUser'

const SESSION_TYPES = {
  WORK: { duration: 25 * 60, label: 'Work', color: 'from-rose-500 to-orange-500' },
  SHORT_BREAK: { duration: 5 * 60, label: 'Short Break', color: 'from-teal-500 to-cyan-500' },
  LONG_BREAK: { duration: 15 * 60, label: 'Long Break', color: 'from-purple-500 to-pink-500' }
}

function App() {
  const [sessionType, setSessionType] = useState('WORK')
  const [timeLeft, setTimeLeft] = useState(SESSION_TYPES.WORK.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const intervalRef = useRef(null)

  const currentSession = SESSION_TYPES[sessionType]
  const totalTime = currentSession.duration
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  // Save completed session to Firestore
  const saveSession = async (type, startTime, endTime, duration) => {
    try {
      const userId = getTempUserId()
      const sessionData = {
        type: type.toLowerCase(),
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        completed: true
      }

      await addDoc(collection(db, 'users', userId, 'sessions'), sessionData)
      console.log('Session saved to Firestore:', sessionData)
    } catch (error) {
      console.error('Error saving session to Firestore:', error)
    }
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            const endTime = new Date().toISOString()

            // Save session to Firestore
            if (sessionStartTime) {
              saveSession(
                currentSession.label,
                sessionStartTime,
                endTime,
                currentSession.duration
              )
            }

            // Increment completed sessions counter for work sessions
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentSession.duration)
    }
    // Record start time when timer begins
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSession.color} flex items-center justify-center p-4 transition-all duration-700`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-2">
          Pomodoro Tracker
        </h1>

        {/* Session Counter */}
        <div className="text-center text-sm text-gray-600 mb-8">
          <span className="inline-flex items-center gap-2">
            <span className="font-semibold">Completed Sessions:</span>
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold">
              {completedSessions}
            </span>
          </span>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {/* Session Type Selector */}
          <div className="flex flex-wrap gap-2 justify-center w-full">
            {Object.entries(SESSION_TYPES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleSessionChange(key)}
                disabled={isRunning}
                className={`font-medium py-2 px-4 md:px-6 rounded-full transition-all duration-300 ${
                  sessionType === key
                    ? 'bg-gradient-to-r ' + value.color + ' text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {value.label}
              </button>
            ))}
          </div>

          {/* Circular Progress with Timer */}
          <div className="relative flex items-center justify-center">
            <svg className="w-72 h-72 transform -rotate-90">
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 130}`}
                strokeDashoffset={`${2 * Math.PI * 130 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={sessionType === 'WORK' ? '#f43f5e' : sessionType === 'SHORT_BREAK' ? '#14b8a6' : '#a855f7'} />
                  <stop offset="100%" stopColor={sessionType === 'WORK' ? '#fb923c' : sessionType === 'SHORT_BREAK' ? '#06b6d4' : '#ec4899'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${currentSession.color} bg-clip-text text-transparent transition-all duration-300 ${isRunning ? 'scale-110' : ''}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                {currentSession.label}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 md:gap-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 md:px-10 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {timeLeft === 0 ? 'Restart' : 'Start'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 px-8 md:px-10 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-3 px-8 md:px-10 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Reset
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 font-medium">
              {isRunning ? 'Timer Running' : timeLeft === 0 ? 'Session Complete!' : 'Timer Paused'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
