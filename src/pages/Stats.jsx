import './Pages.css';

/**
 * Stats Page Component
 * Statistics and analytics dashboard
 *
 * Will contain:
 * - Summary cards (This Week, Total Hours, Best Day)
 * - Stats charts (Line chart, Pie chart)
 */
const Stats = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Productivity Stats</h1>
        <p className="page-subtitle">Track your progress and productivity trends</p>
      </div>

      <div className="page-content">
        {/* Summary cards will go here (Feature 10) */}
        <div className="placeholder-box">
          <p>Summary Cards (Coming in Feature 10)</p>
          <ul>
            <li>This Week</li>
            <li>Total Hours</li>
            <li>Best Day</li>
          </ul>
        </div>

        {/* Stats charts will go here (Feature 8) */}
        <div className="placeholder-box">
          <p>Stats Charts Component (Coming in Feature 8)</p>
          <ul>
            <li>Line Chart - Sessions per day</li>
            <li>Pie Chart - Work vs Break</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;
