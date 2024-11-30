// src/components/Teachers.tsx
import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';

interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [newTeacher, setNewTeacher] = useState<Teacher>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await apiClient.get('/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const createTeacher = async () => {
    try {
      const response = await apiClient.post('/teachers', newTeacher);
      setTeachers([...teachers, response.data]);
      setNewTeacher({ first_name: '', last_name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  const updateTeacher = async (id: number) => {
    if (editTeacher) {
      try {
        const response = await apiClient.put(`/teachers/${id}`, editTeacher);
        setTeachers(teachers.map(t => (t.id === id ? response.data : t)));
        setEditTeacher(null);
      } catch (error) {
        console.error('Error updating teacher:', error);
      }
    }
  };

  const deleteTeacher = async (id: number) => {
    try {
      await apiClient.delete(`/teachers/${id}`);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div>
      <h1>Teachers</h1>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            {editTeacher && editTeacher.id === teacher.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTeacher(teacher.id!);
                }}
              >
                <input
                  type="text"
                  value={editTeacher.first_name}
                  onChange={e => setEditTeacher({ ...editTeacher, first_name: e.target.value })}
                />
                <input
                  type="text"
                  value={editTeacher.last_name}
                  onChange={e => setEditTeacher({ ...editTeacher, last_name: e.target.value })}
                />
                <input
                  type="email"
                  value={editTeacher.email}
                  onChange={e => setEditTeacher({ ...editTeacher, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editTeacher.phone}
                  onChange={e => setEditTeacher({ ...editTeacher, phone: e.target.value })}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                {teacher.first_name} {teacher.last_name} - {teacher.email} ({teacher.phone})
                <button onClick={() => setEditTeacher(teacher)}>Edit</button>
                <button onClick={() => deleteTeacher(teacher.id!)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Teacher</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            createTeacher();
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            value={newTeacher.first_name}
            onChange={e => setNewTeacher({ ...newTeacher, first_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newTeacher.last_name}
            onChange={e => setNewTeacher({ ...newTeacher, last_name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newTeacher.email}
            onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newTeacher.phone}
            onChange={e => setNewTeacher({ ...newTeacher, phone: e.target.value })}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Teachers;
