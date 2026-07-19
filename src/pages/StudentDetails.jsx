// src/pages/StudentDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

const StudentDetails = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const student = students.find(s => s.id === id);

  if (!student) return <h2 className="loader">Student Not Found</h2>;

  return (
    <div className="details-card form-container">
      <h1 style={{ color: 'var(--text-color)' }}>Student Profile</h1>
      <div className="info-grid" style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Age:</strong> {student.age}</p>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <h3>Academic Performance</h3>
          <p><strong>Math:</strong> {student.math}</p>
          <p><strong>Science:</strong> {student.science}</p>
          <p><strong>English:</strong> {student.english}</p>
          <p><strong>Computer:</strong> {student.computer}</p>
          <h2 style={{ color: '#2563eb', marginTop: '10px' }}>
            Average: {student.average}% ({student.grade})
          </h2>
        </div>
      </div>
      <Link to="/students" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
        Back to List
      </Link>
    </div>
  );
};
export default StudentDetails;
