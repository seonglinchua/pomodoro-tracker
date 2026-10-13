import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const STORAGE_KEY = 'darkMode'

// An explicit choice (saved when the user toggles) wins; otherwise follow the OS.
// index.html applies the same rule before first paint so there's no flash.
const getInitialDarkMode = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      return JSON.parse(saved) === true
    }
  } catch {
    // Fall through to the system preference
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Preference just won't persist
    }
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
