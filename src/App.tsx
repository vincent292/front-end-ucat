import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import ProtectedRoute from '../src/auth/ProtectedRoute';
import Teachers from './components/Teachers';
import Subjects from './components/Subjects';
import Classes from './components/Classes';
import Assignments from './components/Assignments';
import AssignmentsByClass from './components/AssignmentsByClass';
import AttendanceByClass from './components/AttendanceByClass';
import AttendanceManager from './components/AttendanceManager';
import GradesManager from './components/GradesManager';
import StudentManager from './components/StudentManager';
import Home from './components/Home';
import Chat from './chat/Chat';
import InfoMarketing from "./components/InfoMarketing";

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <Navbar />
        <div style={{ minHeight: '80vh', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
            <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
            <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
            <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
            <Route path="/assignmentsbyclass" element={<ProtectedRoute><AssignmentsByClass /></ProtectedRoute>} />
            <Route path="/attendanceByClass" element={<ProtectedRoute><AttendanceByClass /></ProtectedRoute>} />
            <Route path="/attendanceManager" element={<ProtectedRoute><AttendanceManager /></ProtectedRoute>} />
            <Route path="/gradesManager" element={<ProtectedRoute><GradesManager /></ProtectedRoute>} />
            <Route path="/studentManager" element={<ProtectedRoute><StudentManager /></ProtectedRoute>} />
            <Route path="/infoMarketing" element={<ProtectedRoute><InfoMarketing /></ProtectedRoute>} />
          </Routes>
        </div>

        {/* Footer siempre visible */}
        <Footer />

        {/* Chat visible solo si el usuario está autenticado */}
        {isAuthenticated && (
          <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1000 }}>
            <Chat />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
