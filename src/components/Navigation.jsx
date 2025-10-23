import { Link } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation Component
 * Top navigation bar with links to all pages
 *
 * Features:
 * - Logo/branding on the left
 * - Navigation links (Home, Stats, Settings)
 * - Responsive design
 */
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">🍅 Pomodoro Tracker</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
