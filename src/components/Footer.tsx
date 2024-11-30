// src/components/Footer.tsx
import React from 'react';
import "../Styles/Footer.css";

const Footer: React.FC = () => (
  <footer className='footer'>
    <div className='sec-1'>
      <h1>
        campus
      </h1>
      <ul>
        <li>campus cochabamba</li>
        <li>campus santa cruz</li>
        <li>campus la paz</li>
      </ul>
    </div>

    <div className='sec-2'>
      <h1> enlaces </h1>
      <ul>
        <li>trabaja con nosotros</li>
        <li>contactos</li>
        <li> +591 654654</li>
        <li>libro de reclamaciones</li>
        <li>mas info+</li>
      </ul>
    </div>

    <div className='sec-3'>
      <h1>
        redes sociales
      </h1>

    </div>
    <p>© 2024 School Management System. All rights reserved.</p>
  </footer>
);

export default Footer;
