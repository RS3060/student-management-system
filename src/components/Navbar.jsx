import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Sun, Moon } from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const Navbar = () => {
  const { theme, toggleTheme} = useStudents();
  
  return (
    <nav className="navbar">
      <div className="nav-logo">Student-Management-System</div>
      <div className="nav-links">
        <Link to="/"><LayoutDashboard size={20}/> Dashboard</Link>
        <Link to="/students"><Users size={20}/> Students</Link>
        <Link to="/add"><UserPlus size={20}/> Add New</Link>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        >
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} color="yellow" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
