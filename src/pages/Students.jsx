import React, { useState } from 'react';
import StudentTable from '../components/StudentTable';
import { mockStudents } from '../data/mockData';

const Students = () => {
  const [students, setStudents] = useState(mockStudents);

  return (
    <div className="page-container">
      <div className="header">
        <h1>Student List</h1>
        <button className="btn-add">Add Student</button>
      </div>
      
      <StudentTable students={students} />
    </div>
  );
};

export default Students;
