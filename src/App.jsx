import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import './App.css';

/**
 * Main App Component
 *
 * Sets up routing for the Pomodoro Tracker application
 * Uses React Router for client-side routing
 *
 * Routes:
 * - / → Home page (Timer, Goals, History)
 * - /stats → Statistics page
 * - /settings → Settings page
 *
 * Note: basename="/pomodoro-tracker" is configured for GitHub Pages deployment
 */
function App() {
  return (
    <Router basename="/pomodoro-tracker">
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
