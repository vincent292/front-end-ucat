import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';

interface Subject {
  id: number;
  name: string;
}

interface Class {
  id?: number;
  name: string;
  schedule: string;
  subject: { id: number }; // Relación con Subject
}

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newClass, setNewClass] = useState<Partial<Class>>({
    name: '',
    schedule: '',
    subject: { id: 0 },
  });
  const [editClass, setEditClass] = useState<Partial<Class> | null>(null);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get('/classes');
      setClasses(response.data);
      setFilteredClasses(response.data); // Inicialmente, las clases filtradas son todas
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await apiClient.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtrar las clases en base al nombre que contenga el término de búsqueda
    const filtered = classes.filter(classItem =>
      classItem.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  const createClass = async () => {
    try {
      const response = await apiClient.post('/classes', newClass);
      setClasses([...classes, response.data]);
      setFilteredClasses([...filteredClasses, response.data]);
      setNewClass({ name: '', schedule: '', subject: { id: 0 } });
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const updateClass = async (id: number) => {
    if (editClass) {
      try {
        const dataToUpdate = {
          name: editClass.name,
          schedule: editClass.schedule,
          subject: { id: editClass.subject?.id || 0 },
        };
        const response = await apiClient.put(`/classes/${id}`, dataToUpdate);
        const updatedClasses = classes.map(c => (c.id === id ? response.data : c));
        setClasses(updatedClasses);
        setFilteredClasses(updatedClasses.filter(classItem =>
          classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setEditClass(null);
      } catch (error) {
        console.error('Error updating class:', error);
      }
    }
  };

  const deleteClass = async (id: number) => {
    try {
      await apiClient.delete(`/classes/${id}`);
      const updatedClasses = classes.filter(c => c.id !== id);
      setClasses(updatedClasses);
      setFilteredClasses(updatedClasses.filter(classItem =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div>
      <h1>Classes</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Search classes"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {filteredClasses.map(classItem => (
          <li key={classItem.id}>
            {editClass && editClass.id === classItem.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateClass(classItem.id!);
                }}
              >
                <input
                  type="text"
                  value={editClass.name || ''}
                  onChange={e => setEditClass({ ...editClass, name: e.target.value })}
                  placeholder="Class Name"
                  required
                />
                <input
                  type="text"
                  value={editClass.schedule || ''}
                  onChange={e => setEditClass({ ...editClass, schedule: e.target.value })}
                  placeholder="Schedule"
                  required
                />
                <select
                  value={editClass.subject?.id || 0}
                  onChange={e =>
                    setEditClass({ ...editClass, subject: { id: Number(e.target.value) } })
                  }
                  required
                >
                  <option value={0}>Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                {classItem.name} - {classItem.schedule} - Subject ID: {classItem.subject.id}
                <button onClick={() => setEditClass(classItem)}>Edit</button>
                <button onClick={() => deleteClass(classItem.id!)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Class</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            createClass();
          }}
        >
          <input
            type="text"
            placeholder="Class Name"
            value={newClass.name || ''}
            onChange={e => setNewClass({ ...newClass, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Schedule"
            value={newClass.schedule || ''}
            onChange={e => setNewClass({ ...newClass, schedule: e.target.value })}
            required
          />
          <select
            value={newClass.subject?.id || 0}
            onChange={e => setNewClass({ ...newClass, subject: { id: Number(e.target.value) } })}
            required
          >
            <option value={0}>Select a subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Classes;
