import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../Styles/index.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='auth-buttons' onClick={() => logout()}> {/* Corrección: onClick en lugar de oneClick */}
      Logout
    </button>
  );
}

export default LogoutButton;
