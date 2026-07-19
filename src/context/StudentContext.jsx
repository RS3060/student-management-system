import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { toast } from 'react-hot-toast';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Requirement #15: Loading State
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');

  // --- REQUIREMENT #14: SIMULATED API FETCH (GET) ---
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Simulate a network delay (1 second)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const savedData = localStorage.getItem('students');
        if (savedData) {
          setStudents(JSON.parse(savedData));
        }
      } catch (error) {
        // Requirement #16: Error Handling
        console.error("Failed to fetch students:", error);
        toast.error("Network Error: Could not load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Sync with LocalStorage (Our "Database")
  // We only save if loading is false to prevent overwriting with empty data
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, loading]);

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // --- API SIMULATION: POST (Add) ---
  const addStudent = async (newStudent) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500)); // Fake network delay
    const studentWithId = { 
      ...newStudent, 
      id: Date.now().toString(),
      dateAdded: new Date().toISOString() 
    };
    setStudents((prev) => [...prev, studentWithId]);
    setLoading(false);
    toast.success('Student Added to Server');
  };

  // --- API SIMULATION: PUT (Update) ---
  const updateStudent = async (id, updatedData) => {
    await new Promise((res) => setTimeout(res, 500));
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    toast.success('Server Updated Successfully');
  };

  // --- API SIMULATION: DELETE ---
  const deleteStudent = async (id) => {
    if (window.confirm("Delete from database?")) {
      await new Promise((res) => setTimeout(res, 300));
      setStudents((prev) => prev.filter(s => s.id !== id));
      toast.error('Student Deleted from Server');
    }
  };

  // Helper Functions
  const toggleAttendance = (id) => {
    const statuses = ['Present', 'Absent', 'Late'];
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const nextIndex = (statuses.indexOf(s.attendance) + 1) % 3;
        return { ...s, attendance: statuses[nextIndex] };
      }
      return s;
    }));
  };

  const calculateGrade = (avg) => {
    if (avg >= 90) return 'A+';
    if (avg >= 80) return 'A';
    if (avg >= 70) return 'B';
    if (avg >= 60) return 'C';
    return 'F';
  };

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const stats = useMemo(() => {
    const total = students.length;
    const avgMarks = total ? (students.reduce((acc, s) => acc + Number(s.average), 0) / total).toFixed(2) : 0;
    const presentToday = students.filter(s => s.attendance === 'Present').length;
    const topPerformer = [...students].sort((a, b) => b.average - a.average)[0]?.name || 'N/A';
    return { total, avgMarks, presentToday, topPerformer };
  }, [students]);

  return (
    <StudentContext.Provider value={{ 
      students, loading, theme, stats, 
      addStudent, updateStudent, deleteStudent, 
      toggleAttendance, calculateGrade, toggleTheme 
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
