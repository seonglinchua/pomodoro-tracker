import { useTheme } from '../contexts/ThemeContext'
import {
  getSummary,
  getDailyData,
  getTypeDistribution,
  getRecentSessions,
  getStreak,
} from '../data/mockData'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'

const COLORS = {
  work: '#f43f5e',
  'short break': '#14b8a6',
  'long break': '#a855f7',
}

const labelFor = (type) =>
  type.replace(/\b\w/g, (c) => c.toUpperCase())

function StatTile({ label, value, suffix, gradient }) {
  return (
    <div className="glass card-hover animate-rise rounded-3xl p-5">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className={`font-display text-3xl font-bold ${gradient} bg-clip-text text-transparent`}>
        {value}
        {suffix && <span className="text-xl">{suffix}</span>}
      </div>
    </div>
  )
}

function GlassTooltip({ active, payload, label, darkMode }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl border px-3 py-2 text-sm shadow-lg"
      style={{
        background: darkMode ? 'rgba(20,22,36,0.9)' : 'rgba(255,255,255,0.95)',
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
        color: darkMode ? '#e8e9f0' : '#1a1b25',
        backdropFilter: 'blur(8px)',
      }}
    >
      {label && <div className="mb-1 font-semibold">{label}</div>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Statistics() {
  const { darkMode } = useTheme()
  const summary = getSummary()
  const daily = getDailyData(7)
  const distribution = getTypeDistribution()
  const recent = getRecentSessions(8)
  const streak = getStreak()
  const axisColor = darkMode ? '#9ca3af' : '#6b7280'

  return (
    <div className="mx-auto max-w-6xl">
      <div className="animate-rise mb-6 mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">Insights</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your focus, visualised. (Demo data)</p>
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          🔥 {streak}-day streak
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Focus sessions" value={summary.workSessions} gradient="bg-gradient-to-r from-rose-500 to-orange-500" />
        <StatTile label="Focus time" value={summary.focusHours} suffix="h" gradient="bg-gradient-to-r from-teal-500 to-cyan-500" />
        <StatTile label="Total sessions" value={summary.totalSessions} gradient="bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        <StatTile label="Breaks taken" value={summary.breakSessions} gradient="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Focus area chart */}
        <div className="glass animate-rise rounded-3xl p-6 lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">Focus minutes this week</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={daily} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="focusArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#ffffff14' : '#0000000d'} />
              <XAxis dataKey="label" stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} />
              <YAxis stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} width={36} />
              <Tooltip content={<GlassTooltip darkMode={darkMode} />} cursor={{ stroke: axisColor, strokeOpacity: 0.2 }} />
              <Area type="monotone" dataKey="minutes" name="minutes" stroke="#f43f5e" strokeWidth={3} fill="url(#focusArea)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution donut */}
        <div className="glass animate-rise rounded-3xl p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">Session mix</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={distribution} cx="50%" cy="50%" innerRadius={62} outerRadius={96} paddingAngle={4} dataKey="value" stroke="none">
                {distribution.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || '#666'} />
                ))}
              </Pie>
              <Tooltip content={<GlassTooltip darkMode={darkMode} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {distribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[entry.name] }} />
                {labelFor(entry.name)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions per day + recent */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass animate-rise rounded-3xl p-6 lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">Sessions per day</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={daily} margin={{ top: 10, right: 8, left: -16, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#ffffff14' : '#0000000d'} />
              <XAxis dataKey="label" stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} />
              <YAxis stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} width={36} allowDecimals={false} />
              <Tooltip content={<GlassTooltip darkMode={darkMode} />} cursor={{ fill: darkMode ? '#ffffff0a' : '#00000008' }} />
              <Bar dataKey="work" name="work" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="break" name="break" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass animate-rise rounded-3xl p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">Recent sessions</h2>
          <div className="space-y-2">
            {recent.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/40 dark:hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[s.type] }} />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{labelFor(s.type)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(s.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ·{' '}
                      {new Date(s.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{s.duration / 60}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
