import { useTimer } from '../contexts/TimerContext'

// Flat-vector tomato palettes per session type. Everything else (shading,
// highlights) is black/white overlays, so only three colours vary.
const TOMATOES = {
  WORK: { body: '#ef4136', calyx: '#22a07f', stem: '#177a60', glow: 'rgba(239,65,54,0.45)' },
  SHORT_BREAK: { body: '#0d9488', calyx: '#a3e635', stem: '#65a30d', glow: 'rgba(20,184,166,0.45)' },
  LONG_BREAK: { body: '#a855f7', calyx: '#5eead4', stem: '#14b8a6', glow: 'rgba(168,85,247,0.45)' },
}

const CX = 210
const BODY_PATH =
  'M 210 96 C 168 64, 88 64, 50 116 C 14 164, 10 262, 36 330 C 62 386, 140 408, 210 408 ' +
  'C 280 408, 358 386, 384 330 C 410 262, 406 164, 370 116 C 332 64, 252 64, 210 96 Z'
// Right/bottom crescent that gives the body its flat "form shadow"
const SHADE_PATH =
  'M 370 116 C 410 164, 406 262, 384 330 C 358 386, 280 408, 210 408 ' +
  'C 285 402, 345 360, 366 294 C 380 250, 378 170, 370 116 Z'

// Dial scale: ticks sit on the front half of an ellipse so the band reads as a cylinder
const DIAL = { rx: 172, ry: 34, top: 250 }
const SEAM = { rx: 178, ry: 34, y: 298 }
const SEAM_PATH = `M ${CX - SEAM.rx} ${SEAM.y} A ${SEAM.rx} ${SEAM.ry} 0 0 0 ${CX + SEAM.rx} ${SEAM.y}`
const BASE_PATH = `${SEAM_PATH} L 440 ${SEAM.y} L 440 440 L -20 ${440} L -20 ${SEAM.y} Z`

// Five-point calyx, flattened to an ellipse so it reads as seen from above
const CALYX = (() => {
  const cx = CX
  const cy = 98
  const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`
  const tips = []
  const inner = []
  for (let i = 0; i < 5; i++) {
    const a = ((-90 + i * 72) * Math.PI) / 180
    const b = a + (36 * Math.PI) / 180
    tips.push([cx + 100 * Math.cos(a), cy + 40 * Math.sin(a)])
    inner.push([cx + 36 * Math.cos(b), cy + 14 * Math.sin(b)])
  }
  const outline = 'M ' + tips.map((t, i) => `${fmt(t)} L ${fmt(inner[i])}`).join(' L ') + ' Z'
  const facets = tips.map((t, i) => `M ${cx} ${cy} L ${fmt(t)} L ${fmt(inner[i])} Z`)
  return { outline, facets }
})()

function DialScale({ minutes }) {
  const marks = []
  for (let k = 0; k < 60; k++) {
    // Signed distance (in minutes) from the pointer, wrapped to [-30, 30)
    const d = ((((k - minutes + 30) % 60) + 60) % 60) - 30
    const theta = (d * 6 * Math.PI) / 180
    const c = Math.cos(theta)
    if (c < 0.1) continue

    const x = CX + DIAL.rx * Math.sin(theta)
    const y = DIAL.top + DIAL.ry * c
    const major = k % 5 === 0

    marks.push(
      <g key={k} opacity={Math.sqrt(c)}>
        <line
          x1={x}
          y1={y}
          x2={x}
          y2={y + (major ? 18 : 10)}
          stroke="#fff"
          strokeWidth={major ? 4 : 2.5}
          strokeLinecap="round"
        />
        {major && (
          <text
            transform={`translate(${x.toFixed(1)} ${(y - 9).toFixed(1)}) scale(${c.toFixed(3)} 1)`}
            textAnchor="middle"
            fill="#fff"
            fontSize="22"
            fontWeight="700"
            className="font-display"
          >
            {k}
          </text>
        )}
      </g>
    )
  }
  return <g>{marks}</g>
}

function TomatoTimer({ palette, timeLeft, isRunning, statusLabel, label, timeText }) {
  return (
    <svg
      viewBox="0 0 420 430"
      className={`relative w-full overflow-visible ${isRunning ? 'animate-tomato-tick' : ''}`}
      role="img"
      aria-label={`${timeText} remaining. ${label}, ${statusLabel}.`}
    >
      <defs>
        <clipPath id="tomatoBody">
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={CX} cy="418" rx="150" ry="9" fill="#000" opacity="0.12" />

      {/* Body */}
      <path d={BODY_PATH} fill={palette.body} />
      <g clipPath="url(#tomatoBody)">
        <path d={SHADE_PATH} fill="#000" opacity="0.12" />
        {/* Stationary base below the seam */}
        <path d={BASE_PATH} fill="#000" opacity="0.1" />
        {/* Creases running down from the calyx */}
        <path d="M 170 118 C 130 126, 104 144, 92 176" fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" />
        <path d="M 250 118 C 290 126, 316 144, 328 176" fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" />
        {/* Flat glints */}
        <path d="M 62 168 C 58 186, 60 204, 66 220" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="9" strokeLinecap="round" />
        <circle cx="70" cy="236" r="4.5" fill="#fff" opacity="0.3" />
      </g>

      {/* Seam between rotating dial and base */}
      <path d={SEAM_PATH} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="3.5" />
      <path d={SEAM_PATH} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" transform="translate(0 4)" />

      {/* Rotating minute scale */}
      <DialScale minutes={timeLeft / 60} />

      {/* Calyx */}
      <path d={CALYX.outline} fill={palette.calyx} strokeLinejoin="round" />
      {CALYX.facets.map((d, i) => (
        <path key={i} d={d} fill="#000" opacity="0.14" />
      ))}
      <path d="M 205 100 L 207 72 Q 210 66 213 72 L 215 100 Z" fill={palette.stem} />
      <ellipse cx={CX} cy="71" rx="5.5" ry="3.5" fill="#fff" opacity="0.25" />

      {/* Digital readout on the face */}
      <text
        x={CX}
        y="196"
        textAnchor="middle"
        fill="#fff"
        fontSize="68"
        fontWeight="700"
        className="font-display"
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}
      >
        {timeText}
      </text>
      <text x={CX} y="226" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" letterSpacing="0.04em">
        {statusLabel} · {label}
      </text>

      {/* Fixed pointer on the base */}
      <path d="M 197 376 L 223 376 L 210 354 Z" fill="#fffdf5" stroke="#fffdf5" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

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

  const palette = TOMATOES[sessionType]
  const isComplete = timeLeft === 0

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const statusLabel = isRunning ? 'Focusing' : isComplete ? 'Complete' : 'Ready'

  return (
    <div className="flex flex-col items-center gap-6">
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

      {/* Tomato kitchen timer */}
      <div className="relative flex w-full max-w-[26rem] items-center justify-center">
        <div
          className="absolute h-64 w-64 rounded-full blur-3xl transition-opacity duration-700"
          style={{ background: palette.glow, opacity: isRunning ? 0.8 : 0.35 }}
        />
        <TomatoTimer
          palette={palette}
          timeLeft={timeLeft}
          isRunning={isRunning}
          statusLabel={statusLabel}
          label={currentSession.label}
          timeText={formatTime(timeLeft)}
        />
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
