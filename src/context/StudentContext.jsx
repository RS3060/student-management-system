import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { toast } from 'react-hot-toast';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const toggleAttendance = (id) => {
    setStudents(prev => prev.map(s => {
     if (s.id === id) {
        const nextStatus = s.attendance === 'Present' ? 'Absent' : 'Present';
        return { ...s, attendance: nextStatus };
      }
      return s;
    }));
  };

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  // Persistence
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // CRUD Operations
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now().toString(), dateAdded: new Date() }]);
    toast.success('Student Added Successfully!');
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
    toast.success('Student Updated!');
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure?")) {
      setStudents(students.filter(s => s.id !== id));
      toast.error('Student Deleted');
    }
  };

  // Logic: Calculate Statistics (using useMemo for performance)
  const stats = useMemo(() => {
    const total = students.length;
    const avgMarks = total ? (students.reduce((acc, s) => acc + Number(s.marks), 0) / total).toFixed(2) : 0;
    const presentToday = students.filter(s => s.attendance === 'Present').length;
    const topPerformer = [...students].sort((a, b) => b.marks - a.marks)[0]?.name || 'N/A';

    return { total, avgMarks, presentToday, topPerformer };
  }, [students]);

  return (
    <StudentContext.Provider value={{ 
      students, addStudent, updateStudent, deleteStudent, toggleAttendance, // Added here
      stats, theme, setTheme 
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
