import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const icons = {
  timer: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V9M12 5V3M9 3h6" />
    </svg>
  ),
  insights: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-7" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
    </svg>
  ),
}

const navItems = [
  { path: '/', label: 'Timer', icon: icons.timer },
  { path: '/statistics', label: 'Insights', icon: icons.insights },
  { path: '/settings', label: 'Settings', icon: icons.settings },
]

export default function Navigation() {
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="container mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/30">
            <span className="text-lg">🍅</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Pomo<span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">focus</span>
          </span>
        </Link>

        {/* Nav pills */}
        <nav className="glass flex items-center gap-1 rounded-full p-1.5">
          {navItems.map(({ path, label, icon }) => {
            const active = isActive(path)
            return (
              <Link
                key={path}
                to={path}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/30'
                    : 'text-gray-600 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-transform duration-300 hover:scale-105 active:scale-95 dark:text-gray-200"
        >
          {darkMode ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
