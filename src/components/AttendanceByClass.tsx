import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig'; // Ajusta la ruta según tu proyecto

interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
}

interface Attendance {
  id?: number;
  date: string;
  status: string;
  student: Student;
  class: { id: number };
}

const AttendanceByClass: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass !== null) {
      fetchAttendancesByClass(selectedClass);
    } else {
      setAttendances([]);
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchAttendancesByClass = async (classId: number) => {
    try {
      const response = await apiClient.get(`/attendance?classId=${classId}`);
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  const updateAttendance = async (id: number, status: string) => {
    try {
      const updatedAttendance = await apiClient.put(`/attendance/${id}`, { status });
      setAttendances(attendances.map(a => (a.id === id ? updatedAttendance.data : a)));
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  return (
    <div>
      <h1>Attendance by Class</h1>
      <div>
        <label>Select Class:</label>
        <select
          value={selectedClass || ''}
          onChange={e => setSelectedClass(Number(e.target.value))}
        >
          <option value="">Select a class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <h2>Attendance for Class {classes.find(c => c.id === selectedClass)?.name}</h2>
          <ul>
            {attendances.map(attendance => (
              <li key={attendance.id}>
                {attendance.student.name} - {attendance.status}
                <button onClick={() => updateAttendance(attendance.id!, 'Present')}>
                  Mark Present
                </button>
                <button onClick={() => updateAttendance(attendance.id!, 'Absent')}>
                  Mark Absent
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AttendanceByClass;
