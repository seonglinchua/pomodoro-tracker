import { useTimer } from '../contexts/TimerContext'

const ACCENTS = {
  WORK: { from: '#f43f5e', to: '#fb923c', glow: 'rgba(244,63,94,0.45)' },
  SHORT_BREAK: { from: '#14b8a6', to: '#06b6d4', glow: 'rgba(20,184,166,0.45)' },
  LONG_BREAK: { from: '#a855f7', to: '#ec4899', glow: 'rgba(168,85,247,0.45)' },
}

const RADIUS = 132
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer() {
  const {
    sessionType,
    timeLeft,
    isRunning,
    completedSessions,
    currentSession,
    SESSION_TYPES,
    handleStart,
    handlePause,
    handleReset,
    handleSessionChange,
  } = useTimer()

  const accent = ACCENTS[sessionType]
  const totalTime = currentSession.duration
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const isComplete = timeLeft === 0

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Session type segmented control */}
      <div className="glass-subtle flex flex-wrap justify-center gap-1 rounded-full p-1">
        {Object.entries(SESSION_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleSessionChange(key)}
            disabled={isRunning}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-5 ${
              sessionType === key
                ? 'bg-gradient-to-r ' + value.color + ' text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/40 dark:text-gray-300 dark:hover:bg-white/10'
            } ${isRunning ? 'cursor-not-allowed opacity-40' : ''}`}
          >
            {value.label}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute h-64 w-64 rounded-full blur-2xl transition-opacity duration-700"
          style={{ background: accent.glow, opacity: isRunning ? 0.9 : 0.4 }}
        />
        <svg className="h-72 w-72 -rotate-90" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r={RADIUS}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="text-gray-200/70 dark:text-white/10"
          />
          <circle
            cx="150"
            cy="150"
            r={RADIUS}
            stroke="url(#timerGradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{ filter: `drop-shadow(0 0 8px ${accent.glow})` }}
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent.from} />
              <stop offset="100%" stopColor={accent.to} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`font-display text-7xl font-bold tabular-nums tracking-tight transition-transform duration-500 ${
              isRunning ? 'scale-105' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span
              className={`h-2 w-2 rounded-full ${isRunning ? 'animate-pulse-glow' : ''}`}
              style={{ background: accent.from }}
            />
            {isRunning ? 'Focusing' : isComplete ? 'Session complete' : 'Ready'} · {currentSession.label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-10 py-3.5 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40 active:scale-95"
          >
            {isComplete ? 'Restart' : 'Start focus'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          aria-label="Reset timer"
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-gray-600 transition-all duration-200 hover:scale-105 active:scale-95 dark:text-gray-300"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Completed counter */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-200">{completedSessions}</span> focus sessions completed
      </div>
    </div>
  )
}
