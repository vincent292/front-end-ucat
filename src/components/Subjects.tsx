import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
}

interface Subject {
  id?: number;
  name: string;
  teacher: { id: number } | null; // Permitir que teacher sea null
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    name: '',
    teacher: { id: 0 },
  });
  const [editSubject, setEditSubject] = useState<Partial<Subject> | null>(null);

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await apiClient.get('/subjects');
      const subjectsData = response.data.map((subject: Subject) => ({
        ...subject,
        teacher: subject.teacher || { id: 0 }, // Asegura que teacher nunca sea null
      }));
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await apiClient.get('/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const createSubject = async () => {
    try {
      const response = await apiClient.post('/subjects', newSubject);
      setSubjects([...subjects, response.data]);
      setNewSubject({ name: '', teacher: { id: 0 } });
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  const updateSubject = async (id: number) => {
    if (editSubject) {
      try {
        const dataToUpdate = {
          name: editSubject.name,
          teacher: { id: editSubject.teacher?.id || 0 },
        };
        const response = await apiClient.put(`/subjects/${id}`, dataToUpdate);
        setSubjects(subjects.map(s => (s.id === id ? response.data : s)));
        setEditSubject(null);
      } catch (error) {
        console.error('Error updating subject:', error);
      }
    }
  };

  const deleteSubject = async (id: number) => {
    try {
      await apiClient.delete(`/subjects/${id}`);
      setSubjects(subjects.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  return (
    <div>
      <h1>Subjects</h1>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>
            {editSubject && editSubject.id === subject.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateSubject(subject.id!);
                }}
              >
                <input
                  type="text"
                  value={editSubject.name || ''}
                  onChange={e => setEditSubject({ ...editSubject, name: e.target.value })}
                  placeholder="Subject Name"
                  required
                />
                <select
                  value={editSubject.teacher?.id || 0}
                  onChange={e =>
                    setEditSubject({ ...editSubject, teacher: { id: Number(e.target.value) } })
                  }
                  required
                >
                  <option value={0}>Select a teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.first_name} {teacher.last_name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                {subject.name} - Teacher ID: {subject.teacher?.id || 'Not assigned'}
                <button onClick={() => setEditSubject(subject)}>Edit</button>
                <button onClick={() => deleteSubject(subject.id!)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Subject</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            createSubject();
          }}
        >
          <input
            type="text"
            placeholder="Subject Name"
            value={newSubject.name || ''}
            onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
            required
          />
          <select
            value={newSubject.teacher?.id || 0}
            onChange={e => setNewSubject({ ...newSubject, teacher: { id: Number(e.target.value) } })}
            required
          >
            <option value={0}>Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Subjects;
