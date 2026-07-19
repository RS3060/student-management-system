import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addStudent, updateStudent, students } = useStudents();
  
  const [formData, setFormData] = useState({
    name: '', age: '', class: '', email: '', phone: '', gender: 'Male', marks: '', attendance: 'Present'
  });

  useEffect(() => {
    if (id) {
      const existing = students.find(s => s.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation Logic
    if (formData.age < 5 || formData.age > 30) return alert("Age must be 5-30");
    if (formData.marks < 0 || formData.marks > 100) return alert("Marks must be 0-100");

    if (id) updateStudent(id, formData);
    else addStudent(formData);
    
    navigate('/students');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <div className="form-row">
          <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
          <input type="number" placeholder="Marks" value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})} />
        </div>
        <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
          <option value="">Select Class</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>
        <button type="submit" className="submit-btn">Save Student</button>
      </form>
    </div>
  );
};
export default StudentForm;
