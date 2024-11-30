import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';


interface Student {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  grade: number;
  parent_contact: string;
  created_at?: string;
  classId?: number;
}

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    grade: 0,
    parent_contact: '',
  });
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      const response = await apiClient.post('/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ first_name: '', last_name: '', date_of_birth: '', grade: 0, parent_contact: '' });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async (id: number) => {
    try {
      const studentToUpdate = students.find(student => student.id === id);
      if (studentToUpdate) {
        const response = await apiClient.put(`/students/${id}`, studentToUpdate);
        setStudents(students.map(student => (student.id === id ? response.data : student)));
        setEditingStudentId(null);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await apiClient.delete(`/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-manager">
      <h1>Student Manager</h1>

      <h2>Add New Student</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          createStudent();
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.first_name || ''}
          onChange={e => setNewStudent({ ...newStudent, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.last_name || ''}
          onChange={e => setNewStudent({ ...newStudent, last_name: e.target.value })}
          required
        />
        <input
          type="date"
          value={newStudent.date_of_birth || ''}
          onChange={e => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Grade"
          value={newStudent.grade || 0}
          onChange={e => setNewStudent({ ...newStudent, grade: Number(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Parent Contact"
          value={newStudent.parent_contact || ''}
          onChange={e => setNewStudent({ ...newStudent, parent_contact: e.target.value })}
          required
        />
        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {editingStudentId === student.id ? (
              <>
                <input
                  type="text"
                  value={student.first_name}
                  onChange={e => setStudents(students.map(s => (s.id === student.id ? { ...s, first_name: e.target.value } : s)))}
                />
                <input
                  type="text"
                  value={student.last_name}
                  onChange={e => setStudents(students.map(s => (s.id === student.id ? { ...s, last_name: e.target.value } : s)))}
                />
                <button onClick={() => updateStudent(student.id)}>Save</button>
                <button onClick={() => setEditingStudentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {`${student.first_name} ${student.last_name}`} - Grade: {student.grade}
                <button onClick={() => setEditingStudentId(student.id)}>Edit</button>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManager;
