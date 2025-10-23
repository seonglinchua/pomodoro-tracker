import { useTheme } from '../contexts/ThemeContext'
import { getTempUserId, clearTempUserId, getCurrentTempUserId } from '../utils/tempUser'

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Dark Mode</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Toggle dark/light theme</div>
            </div>
            <button
              onClick={toggleDarkMode}
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle dark mode"
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              >
                <span className="flex items-center justify-center h-full text-xs">
                  {darkMode ? '🌙' : '☀️'}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Timer Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Timer Durations</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Session (minutes)
              </label>
              <input
                type="number"
                defaultValue="25"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                disabled
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Custom durations coming soon!</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break (minutes)
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break (minutes)
              </label>
              <input
                type="number"
                defaultValue="15"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled
              />
            </div>
          </div>
        </div>

        {/* User Data */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Data</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current User ID</div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-300 font-mono break-all">
                {currentUserId || 'No ID generated yet'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This is your temporary user ID. Your sessions are saved under this ID.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleGenerateNewId}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Generate New ID
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-800 dark:text-white">Pomodoro Tracker</strong> helps you stay focused and productive using the Pomodoro Technique.
            </p>
            <p>
              Work in 25-minute focused sessions, take short breaks, and track your progress over time.
            </p>
            <p className="text-sm mt-4">
              Version 1.0.0 | Built with React + Firebase
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
