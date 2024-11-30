import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig'; // Ajusta la ruta según tu proyecto

interface Class {
  id: number;
  name: string;
}

interface Assignment {
  id?: number;
  description: string;
  due_date: string;
  class: { id: number };
}

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    description: '',
    due_date: '',
    class: { id: 0 },
  });
  const [editAssignment, setEditAssignment] = useState<Partial<Assignment> | null>(null);

  useEffect(() => {
    fetchAssignments();
    fetchClasses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await apiClient.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const createAssignment = async () => {
    try {
      const response = await apiClient.post('/assignments', newAssignment);
      setAssignments([...assignments, response.data]);
      setNewAssignment({ description: '', due_date: '', class: { id: 0 } });
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const updateAssignment = async (id: number) => {
    if (editAssignment) {
      try {
        const response = await apiClient.put(`/assignments/${id}`, editAssignment);
        setAssignments(assignments.map(a => (a.id === id ? response.data : a)));
        setEditAssignment(null);
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
    }
  };

  const deleteAssignment = async (id: number) => {
    try {
      await apiClient.delete(`/assignments/${id}`);
      setAssignments(assignments.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div>
      <h1>Assignments</h1>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            {editAssignment && editAssignment.id === assignment.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateAssignment(assignment.id!);
                }}
              >
                <input
                  type="text"
                  value={editAssignment.description || ''}
                  onChange={e => setEditAssignment({ ...editAssignment, description: e.target.value })}
                  placeholder="Assignment Description"
                  required
                />
                <input
                  type="date"
                  value={editAssignment.due_date || ''}
                  onChange={e => setEditAssignment({ ...editAssignment, due_date: e.target.value })}
                  required
                />
                <select
                  value={editAssignment.class?.id || 0}
                  onChange={e =>
                    setEditAssignment({ ...editAssignment, class: { id: Number(e.target.value) } })
                  }
                  required
                >
                  <option value={0}>Select a class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                {assignment.description} - Due: {assignment.due_date} - Class: {assignment.class.id}
                <button onClick={() => setEditAssignment(assignment)}>Edit</button>
                <button onClick={() => deleteAssignment(assignment.id!)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Assignment</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            createAssignment();
          }}
        >
          <input
            type="text"
            placeholder="Assignment Description"
            value={newAssignment.description || ''}
            onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })}
            required
          />
          <input
            type="date"
            value={newAssignment.due_date || ''}
            onChange={e => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
            required
          />
          <select
            value={newAssignment.class?.id || 0}
            onChange={e => setNewAssignment({ ...newAssignment, class: { id: Number(e.target.value) } })}
            required
          >
            <option value={0}>Select a class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Assignments;
