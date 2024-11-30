// src/auth/ProtectedRoute.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    loginWithRedirect();
    return <></>;  // No renderiza nada mientras redirige
  }

  // Si está autenticado, renderiza los componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;
