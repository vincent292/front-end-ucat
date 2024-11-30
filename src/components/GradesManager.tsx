import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import '../Styles/FormStyles.css';


interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
}

interface Grade {
  id?: number;
  score: number;
  date: string;
  student: Student;
  class: Class;
}

const GradesManager: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [newGrade, setNewGrade] = useState<Partial<Grade>>({
    score: 0,
    date: '',
    student: { id: 0, first_name: '', last_name: '' },
    class: { id: 0, name: '' },
  });
  const [editingGradeId, setEditingGradeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrades();
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
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

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createGrade = async () => {
    try {
      const response = await apiClient.post('/grades', {
        score: newGrade.score,
        date: newGrade.date,
        student: { id: newGrade.student?.id },
        class: { id: newGrade.class?.id },
      });
      setGrades([...grades, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error creating grade:', error);
    }
  };

  const updateGrade = async (grade: Grade) => {
    try {
      const response = await apiClient.put(`/grades/${grade.id}`, {
        score: grade.score,
        date: grade.date,
        student: { id: grade.student.id },
        class: { id: grade.class.id },
      });
      setGrades(grades.map(g => (g.id === grade.id ? response.data : g)));
      setEditingGradeId(null);
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  const deleteGrade = async (id: number) => {
    try {
      await apiClient.delete(`/grades/${id}`);
      setGrades(grades.filter(g => g.id !== id));
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const resetForm = () => {
    setNewGrade({
      score: 0,
      date: '',
      student: { id: 0, first_name: '', last_name: '' },
      class: { id: 0, name: '' },
    });
    setEditingGradeId(null);
  };

  return (
    <div>
      <h1>Grades Manager</h1>

      <h2>Create New Grade</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          createGrade();
        }}
      >
        <input
          type="number"
          placeholder="Score"
          value={newGrade.score || ''}
          onChange={e => setNewGrade({ ...newGrade, score: Number(e.target.value) })}
          required
        />
        <input
          type="date"
          value={newGrade.date || ''}
          onChange={e => setNewGrade({ ...newGrade, date: e.target.value })}
          required
        />
        <select
          value={newGrade.student?.id || ''}
          onChange={e => {
            const student = students.find(s => s.id === Number(e.target.value));
            setNewGrade({ ...newGrade, student });
          }}
          required
        >
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {`${student.first_name} ${student.last_name}`}
            </option>
          ))}
        </select>
        <select
          value={newGrade.class?.id || ''}
          onChange={e => {
            const cls = classes.find(c => c.id === Number(e.target.value));
            setNewGrade({ ...newGrade, class: cls });
          }}
          required
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Grade</button>
      </form>

      <h2>Grades List</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {grades.map(grade => (
          <li key={grade.id}>
            {editingGradeId === grade.id ? (
              <div>
                <input
                  type="number"
                  value={grade.score}
                  onChange={e =>
                    setGrades(grades.map(g =>
                      g.id === grade.id ? { ...g, score: Number(e.target.value) } : g
                    ))
                  }
                />
                <input
                  type="date"
                  value={grade.date}
                  onChange={e =>
                    setGrades(grades.map(g =>
                      g.id === grade.id ? { ...g, date: e.target.value } : g
                    ))
                  }
                />
                <select
                  value={grade.student.id}
                  onChange={e => {
                    const student = students.find(s => s.id === Number(e.target.value));
                    setGrades(grades.map(g =>
                      g.id === grade.id ? { ...g, student: student! } : g
                    ));
                  }}
                >
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {`${student.first_name} ${student.last_name}`}
                    </option>
                  ))}
                </select>
                <select
                  value={grade.class.id}
                  onChange={e => {
                    const cls = classes.find(c => c.id === Number(e.target.value));
                    setGrades(grades.map(g =>
                      g.id === grade.id ? { ...g, class: cls! } : g
                    ));
                  }}
                >
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => updateGrade(grade)}>Save</button>
                <button onClick={() => setEditingGradeId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {`${grade.student.first_name} ${grade.student.last_name}`} - 
                Class: {grade.class.name} - 
                Score: {grade.score} - 
                Date: {grade.date}
                <button onClick={() => setEditingGradeId(grade.id!)}>Edit</button>
                <button onClick={() => deleteGrade(grade.id!)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradesManager;
