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
import "../src/Styles/loading.css";
import Authhome   from "./components/Authhome";

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
       
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="200px"
          width="200px"
          viewBox="0 0 200 200"
          className="pencil"
        >
          <defs>
            <clipPath id="pencil-eraser">
              <rect height="30" width="30" ry="5" rx="5"></rect>
            </clipPath>
          </defs>
          <circle
            transform="rotate(-113,100,100)"
            strokeLinecap="round"
            strokeDashoffset="439.82"
            strokeDasharray="439.82 439.82"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            r="70"
            className="pencil__stroke"
          ></circle>
          <g transform="translate(100,100)" className="pencil__rotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                strokeDashoffset="402"
                strokeDasharray="402.12 402.12"
                strokeWidth="30"
                stroke="hsl(223,90%,50%)"
                r="64"
                className="pencil__body1"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="465"
                strokeDasharray="464.96 464.96"
                strokeWidth="10"
                stroke="hsl(223,90%,60%)"
                r="74"
                className="pencil__body2"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="339"
                strokeDasharray="339.29 339.29"
                strokeWidth="10"
                stroke="hsl(223,90%,40%)"
                r="54"
                className="pencil__body3"
              ></circle>
            </g>
            <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
              <g className="pencil__eraser-skew">
                <rect
                  height="30"
                  width="30"
                  ry="5"
                  rx="5"
                  fill="hsl(223,90%,70%)"
                ></rect>
                <rect
                  clipPath="url(#pencil-eraser)"
                  height="30"
                  width="5"
                  fill="hsl(223,90%,60%)"
                ></rect>
                <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
                <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
                <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
                <rect height="2" width="30" y="6" fill="hsla(223,10%,10%,0.2)"></rect>
                <rect
                  height="2"
                  width="30"
                  y="13"
                  fill="hsla(223,10%,10%,0.2)"
                ></rect>
              </g>
            </g>
            <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
              <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)"></polygon>
              <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
              <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)"></polygon>
            </g>
          </g>
        </svg>
      </div>
    );
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
            <Route path="/authhome" element={<ProtectedRoute><Authhome /></ProtectedRoute>} />
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
