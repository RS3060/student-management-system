import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addStudent, updateStudent, students, calculateGrade } = useStudents();
  
  const [formData, setFormData] = useState({
    name: '', age: '', class: '', email: '', phone: '', gender: 'Male',
    math: 0, science: 0, english: 0, computer: 0, attendance: 'Present'
  });

  useEffect(() => {
    if (id) {
      const existing = students.find(s => s.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, students]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (Requirement #2)
    if (formData.age < 5 || formData.age > 30) return alert("Age must be between 5 and 30");
    
    // Calculate Average & Grade (Requirement #11)
    const avg = (Number(formData.math) + Number(formData.science) + Number(formData.english) + Number(formData.computer)) / 4;
    const finalData = { ...formData, average: avg.toFixed(2), grade: calculateGrade(avg) };

    if (id) updateStudent(id, finalData);
    else addStudent(finalData);
    
    navigate('/students');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <div className="form-container">
      <h2 style={{ color: 'black', marginBottom: '1.5rem' }}>
        {id ? 'Edit Student Record' : 'Register New Student'}
      </h2>
      
      <form onSubmit={handleSubmit} className="student-form">
        {/* Basic Info Group */}
        <div className="form-section">
          <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <label>Age</label>
            <input name="age" type="number" placeholder="5-30" value={formData.age} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Class</label>
            <select name="class" value={formData.class} onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>
        </div>

        {/* Subjects Group (Requirement #11 Fix) */}
        <h4 style={{ color: 'black', margin: '20px 0 10px 0', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          Subject Marks
        </h4>
        
        <div className="form-row">
          <div className="input-group">
            <label>Mathematics</label>
            <input name="math" type="number" onChange={handleChange} value={formData.math} min="0" max="100" />
          </div>
          <div className="input-group">
            <label>Science</label>
            <input name="science" type="number" onChange={handleChange} value={formData.science} min="0" max="100" />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>English</label>
            <input name="english" type="number" onChange={handleChange} value={formData.english} min="0" max="100" />
          </div>
          <div className="input-group">
            <label>Computer</label>
            <input name="computer" type="number" onChange={handleChange} value={formData.computer} min="0" max="100" />
          </div>
        </div>

        <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>
          {id ? 'Update Student' : 'Add Student to Database'}
        </button>
      </form>
    </div>
  );
};
export default StudentForm;
