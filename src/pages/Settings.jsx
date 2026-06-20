import { useTheme } from '../contexts/ThemeContext'
import { getTempUserId, clearTempUserId, getCurrentTempUserId } from '../utils/tempUser'

function SettingsCard({ title, children, badge }) {
  return (
    <div className="glass animate-rise rounded-3xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        {badge}
      </div>
      {children}
    </div>
  )
}

function DurationField({ label, value, accent }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>
      <div className="glass-subtle flex items-center justify-between rounded-2xl px-4 py-3">
        <span className="font-display text-xl font-bold text-gray-800 dark:text-white">{value}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">min</span>
      </div>
      <div className={`mt-1.5 h-1 rounded-full bg-gradient-to-r ${accent} opacity-60`} />
    </div>
  )
}

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme()
  const currentUserId = getCurrentTempUserId()

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
      clearTempUserId()
      alert('Data cleared! Refresh the page to start fresh.')
    }
  }

  const handleGenerateNewId = () => {
    clearTempUserId()
    const newId = getTempUserId()
    alert(`New user ID generated: ${newId}`)
    window.location.reload()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="animate-rise mb-6 mt-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Personalise your focus experience.</p>
      </div>

      <div className="space-y-5">
        {/* Appearance */}
        <SettingsCard title="Appearance">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Dark mode</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Easier on the eyes at night</div>
            </div>
            <button
              onClick={toggleDarkMode}
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle dark mode"
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white text-xs shadow transition-transform duration-300 ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              >
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>
          </div>
        </SettingsCard>

        {/* Timer durations */}
        <SettingsCard
          title="Timer durations"
          badge={<span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">Soon</span>}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DurationField label="Work" value="25" accent="from-rose-500 to-orange-500" />
            <DurationField label="Short break" value="5" accent="from-teal-500 to-cyan-500" />
            <DurationField label="Long break" value="15" accent="from-violet-500 to-fuchsia-500" />
          </div>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">Custom durations are coming soon.</p>
        </SettingsCard>

        {/* User data */}
        <SettingsCard title="Your data">
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Current user ID</div>
              <div className="glass-subtle break-all rounded-2xl px-4 py-3 font-mono text-sm text-gray-700 dark:text-gray-200">
                {currentUserId || 'No ID generated yet'}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleGenerateNewId}
                className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Generate new ID
              </button>
              <button
                onClick={handleClearData}
                className="glass flex-1 rounded-2xl px-4 py-2.5 font-semibold text-rose-600 transition-all duration-200 hover:scale-[1.02] active:scale-95 dark:text-rose-400"
              >
                Clear all data
              </button>
            </div>
          </div>
        </SettingsCard>

        {/* About */}
        <SettingsCard title="About">
          <div className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            <p>
              <strong className="text-gray-800 dark:text-white">Pomofocus</strong> helps you stay focused using the Pomodoro Technique — work in focused sprints and track your progress over time.
            </p>
            <p className="pt-2 text-xs text-gray-400 dark:text-gray-500">Version 1.0.0 · Built with React, Vite &amp; Tailwind</p>
          </div>
        </SettingsCard>
      </div>
    </div>
  )
}
