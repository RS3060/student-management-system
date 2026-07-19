import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Students from './pages/Students';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navbar could go here */}
        <Routes>
          <Route path="/" element={<Students />} />
          {/* Add other routes as you build them */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
