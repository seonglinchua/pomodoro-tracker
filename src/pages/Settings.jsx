import './Pages.css';

/**
 * Settings Page Component
 * User preferences and configuration
 *
 * Will contain:
 * - Timer settings (work duration, break duration, notifications)
 * - Account information (temp user ID)
 */
const Settings = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p className="page-subtitle">Customize your Pomodoro experience</p>
      </div>

      <div className="page-content">
        {/* Timer settings section (Feature 11) */}
        <div className="placeholder-box">
          <p>Timer Settings (Coming in Feature 11)</p>
          <ul>
            <li>Work Session Duration</li>
            <li>Break Duration</li>
            <li>Enable Notifications</li>
          </ul>
        </div>

        {/* Account information section (Feature 11) */}
        <div className="placeholder-box">
          <p>Account Information (Coming in Feature 11)</p>
          <ul>
            <li>Temp User ID Display</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
