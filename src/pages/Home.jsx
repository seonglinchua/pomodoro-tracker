import Timer from '../components/Timer'
import { getTodayStats, getStreak } from '../data/mockData'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function GoalRing({ value, goal }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(1, goal ? value / goal : 0)
  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-gray-200/70 dark:stroke-white/10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="url(#goalGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">of {goal}</span>
      </div>
    </div>
  )
}

export default function Home() {
  const today = getTodayStats()
  const streak = getStreak()

  return (
    <div className="mx-auto max-w-6xl">
      <div className="animate-rise mb-6 mt-2">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{greeting()} 👋</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Let&apos;s get into focus.
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Timer card */}
        <div className="glass card-hover animate-rise rounded-[2rem] p-8 md:p-10 lg:col-span-2">
          <Timer />
        </div>

        {/* Today panel */}
        <div className="flex flex-col gap-5">
          <div className="glass card-hover animate-rise rounded-[2rem] p-6" style={{ animationDelay: '80ms' }}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">Today&apos;s goal</h2>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-500">Daily</span>
            </div>
            <div className="flex items-center gap-5">
              <GoalRing value={today.workSessions} goal={today.goal} />
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">{today.focusMinutes}m</div>
                  <div className="text-gray-500 dark:text-gray-400">focused today</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">🔥 {streak}</div>
                  <div className="text-gray-500 dark:text-gray-400">day streak</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass card-hover animate-rise rounded-[2rem] p-6" style={{ animationDelay: '140ms' }}>
            <h2 className="mb-3 font-display text-lg font-bold text-gray-900 dark:text-white">Focus tip</h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Work in 25-minute sprints, then take a short break. After four sprints, reward yourself with a longer one to stay fresh all day.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
