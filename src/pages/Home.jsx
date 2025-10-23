import './Pages.css';

/**
 * Home Page Component
 * Main dashboard for the Pomodoro Tracker
 *
 * Will contain:
 * - Timer component
 * - Goal setting component
 * - Session history component
 */
const Home = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>🍅 Pomodoro Tracker</h1>
        <p className="page-subtitle">Focus, track, and achieve your productivity goals</p>
      </div>

      <div className="page-content">
        {/* Timer component will go here (Feature 5) */}
        <div className="placeholder-box">
          <p>Timer Component (Coming in Feature 5)</p>
        </div>

        {/* Goal Setting component will go here (Feature 7) */}
        <div className="placeholder-box">
          <p>Goal Setting Component (Coming in Feature 7)</p>
        </div>

        {/* Session History component will go here (Feature 6) */}
        <div className="placeholder-box">
          <p>Session History Component (Coming in Feature 6)</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
