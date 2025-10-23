import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { TimerProvider } from './contexts/TimerContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <BrowserRouter basename="/pomodoro-tracker">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TimerProvider>
    </ThemeProvider>
  )
}

export default App
