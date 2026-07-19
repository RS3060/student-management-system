// src/pages/StudentList.jsx
import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import { Search, Edit, Trash2, Eye, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const StudentList = () => {
  const { students, deleteStudent, toggleAttendance, loading } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Requirement #5
  const [filterClass, setFilterClass] = useState('All'); // Requirement #6
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  if (loading) {
    return <Loader />;
  }

  // 1. Filter Logic (Search + Class Filter)
  const filtered = students
    .filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(s => filterClass === 'All' ? true : s.class === filterClass);

  // 2. Sorting Logic (Requirement #5)
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'age') return a.age - b.age;
    if (sortBy === 'marks') return b.average - a.average; // Descending
    if (sortBy === 'recent') return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  // 3. Pagination Logic
  const indexOfLastItem = currentPage * studentsPerPage;
  const indexOfFirstItem = indexOfLastItem - studentsPerPage;
  const currentStudents = sorted.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="list-page">
      <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        <div className="search-box" style={{ flex: 2 }}>
          <Search size={18}/>
          <input placeholder="Search name or email..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Sort Dropdown - Requirement #5 */}
        <div className="input-group" style={{ flex: 1 }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
            <option value="marks">Sort by Marks</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>

        {/* Filter Dropdown - Requirement #6 */}
        <div className="input-group" style={{ flex: 1 }}>
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="All">All Classes</option>
            <option value="10th">10th Grade</option>
            <option value="11th">11th Grade</option>
            <option value="12th">12th Grade</option>
          </select>
        </div>
      </div>

      <table className="student-table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th><th>Class</th><th>Avg Marks</th><th>Grade</th><th>Attendance</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.average}%</td>
              <td><span className="grade-badge">{s.grade}</span></td>
              <td>
                <button onClick={() => toggleAttendance(s.id)} className={`status-pill ${s.attendance.toLowerCase()}`}>
                  {s.attendance}
                </button>
              </td>
              <td className="actions">
                <Link title="View Profile" to={`/student/${s.id}`}><Eye size={18}/></Link>
                <Link title="Edit" to={`/edit/${s.id}`}><Edit size={18} color="blue"/></Link>
                <button title="Delete" onClick={() => deleteStudent(s.id)}><Trash2 size={18} color="red"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length > studentsPerPage && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span>Page {currentPage}</span>
          <button disabled={indexOfLastItem >= filtered.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};
export default StudentList;
