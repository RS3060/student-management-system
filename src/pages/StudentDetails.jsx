import { useParams, Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

const StudentDetails = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const student = students.find(s => s.id === id);

  if (!student) return <h2>Student Not Found</h2>;

  return (
    <div className="details-card">
      <h1>Student Profile</h1>
      <div className="info">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Marks:</strong> {student.marks}%</p>
        <p><strong>Status:</strong> {student.attendance}</p>
      </div>
      <Link to="/students">Back to List</Link>
    </div>
  );
};
export default StudentDetails;
