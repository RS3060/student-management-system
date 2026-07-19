import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import { Search, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const { students, deleteStudent, toggleAttendance } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Logic: Search, Filter, and Sort combined
  const processedStudents = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(s => filterClass === 'All' ? true : s.class === filterClass)
    .sort((a, b) => {
      if (sortBy === 'marks') return b.marks - a.marks;
      if (sortBy === 'age') return a.age - b.age;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="list-page">
      <div className="controls">
        <div className="search-box">
          <Search size={18}/>
          <input placeholder="Search name or email..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        
        <select onChange={(e) => setFilterClass(e.target.value)}>
          <option value="All">All Classes</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="marks">Sort by Marks</option>
          <option value="age">Sort by Age</option>
        </select>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedStudents.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.email}</td>
              <td>{s.marks}%</td>
              <td>
                <button 
                  onClick={() => toggleAttendance(s.id)}
                  className={`status-pill ${s.attendance.toLowerCase()}`}
                >
                  {s.attendance}
                </button>
              </td>
              <td className="actions">
                {/* Clicking Eye now goes to a specific ID page */}
                <Link title="View Details" to={`/student/${s.id}`}><Eye size={18}/></Link>
                <Link title="Edit" to={`/edit/${s.id}`}><Edit size={18} color="blue"/></Link>
                <button title="Delete" onClick={() => deleteStudent(s.id)}><Trash2 size={18} color="red"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentList;
