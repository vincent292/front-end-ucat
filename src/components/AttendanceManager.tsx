import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig'; // Ajusta la ruta según tu proyecto

interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
}

interface Attendance {
  id?: number;
  date: string;
  status: string;
  student: Student;
  class: { id: number };
}

interface StudentWithAttendance {
  student: Student;
  attendance: Attendance;
}

const AttendanceManager: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [studentsWithAttendance, setStudentsWithAttendance] = useState<StudentWithAttendance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudentsWithAttendance = async () => {
    if (!selectedClass || !selectedDate) return;
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/attendance/students-with-attendance?classId=${selectedClass}&date=${selectedDate}`
      );
      console.log('Response from backend:', response.data); // Verifica la salida
      setStudentsWithAttendance(response.data);
    } catch (error) {
      console.error('Error fetching students with attendance:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const updateAttendance = async (attendanceId: number | undefined, studentId: number, status: string) => {
    const date = selectedDate;
    if (attendanceId) {
      // Actualiza un registro existente
      try {
        const response = await apiClient.put(`/attendance/${attendanceId}`, { status, date });
        setStudentsWithAttendance(prev =>
          prev.map(item =>
            item.attendance.id === attendanceId ? { ...item, attendance: response.data } : item
          )
        );
      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    } else {
      // Crea un nuevo registro de asistencia
      try {
        const response = await apiClient.post('/attendance', {
          student: { id: studentId },
          class: { id: selectedClass! },
          status,
          date,
        });
        setStudentsWithAttendance(prev =>
          prev.map(item =>
            item.student.id === studentId ? { ...item, attendance: response.data } : item
          )
        );
      } catch (error) {
        console.error('Error adding attendance:', error);
      }
    }
  };

  return (
    <div>
      <h1>Attendance Manager</h1>

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

      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>

      <button onClick={fetchStudentsWithAttendance}>Search</button>

      {loading && <p>Loading...</p>}

      {studentsWithAttendance.length > 0 && (
        <>
          <h2>Attendance Records</h2>
          <ul>
            {studentsWithAttendance.map(({ student, attendance }) => (
              <li key={student.id}>
                {`${student.first_name} ${student.last_name}`} - 
                Status: {attendance.status || 'Not Recorded'}
                <button onClick={() => updateAttendance(attendance.id, student.id, 'Present')}>
                  Mark Present
                </button>
                <button onClick={() => updateAttendance(attendance.id, student.id, 'Absent')}>
                  Mark Absent
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {!loading && studentsWithAttendance.length === 0 && (
        <p>No attendance records found for the selected class and date.</p>
      )}
    </div>
  );
};

export default AttendanceManager;
