import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Sun, Moon } from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const Navbar = () => {
  const { theme, setTheme } = useStudents();
  
  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-logo">Student-Management-System</div>
      <div className="nav-links">
        <Link to="/"><LayoutDashboard size={20}/> Dashboard</Link>
        <Link to="/students"><Users size={20}/> Students</Link>
        <Link to="/add"><UserPlus size={20}/> Add New</Link>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
