import React from 'react';
import "../Styles/Authhome.css";
import { Link } from "react-router-dom";

function Authhome() {
  return (
    <>
      <div className="auth-home">
        <h1>Portal comunity</h1>
      </div>
      <div className='hero-card'>  

      <Link to="/teachers" className="card2">
      <h2>Profesores</h2>
    </Link>
    
    <Link to="/subjects" className="card2">
      <h2>Tareas</h2>
    </Link>

    <Link to="/classes" className="card2">
      <h2>clases</h2>
    </Link>

    <Link to="/assignments" className="card2">
      <h2>assignments</h2>
    </Link>

    <Link to="/assignmentsbyclass" className="card2">
      <h2>assignmentsbyclass</h2>
    </Link>

    <Link to="/attendanceByClass" className="card2">
      <h2>attendanceByClass</h2>
    </Link>

    <Link to="/attendanceManager" className="card2">
      <h2>attendanceManager</h2>
    </Link>

    <Link to="/gradesManager" className="card2">
      <h2>gradesManager</h2>
    </Link>

    <Link to="/studentManager" className="card2">
      <h2>studentManager</h2>
    </Link>

    <Link to="/infoMarketing" className="card2">
      <h2>infoMarketing</h2>
    </Link>

   
      
      </div>
    </>
  );
}

export default Authhome;