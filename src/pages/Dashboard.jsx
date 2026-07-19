import { useStudents } from '../context/StudentContext';

const Dashboard = () => {
  const { stats, students } = useStudents();

  return (
    <div className="dashboard-container">
      <h1 style={{ color: 'black' }}>Overview</h1> {/* Renamed and colored */}
      <div className="stats-grid">
        <div className="stat-card"><h3>Total Students</h3><p>{stats.total}</p></div>
        <div className="stat-card"><h3>Present Today</h3><p>{stats.presentToday}</p></div>
        <div className="stat-card"><h3>Avg Marks</h3><p>{stats.avgMarks}%</p></div>
        <div className="stat-card"><h3>Highest Marks</h3><p>{stats.topPerformer}</p></div> {/* Renamed */}
      </div>
      <div className="recent-list">
        <h2 style={{ color: 'black' }}>Students</h2> {/* Renamed and colored */}
        {students.length === 0 ? <p>No students added yet.</p> : 
          students.slice(-3).reverse().map(s => (
            <div key={s.id} className="recent-item">
              {s.name} - {s.class} ({s.attendance})
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default Dashboard;
