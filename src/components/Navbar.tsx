import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import "../Styles/index.css";

export default function Navbar() {
  // Usa el hook useAuth0 dentro del componente
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navbar">
      <div className="logo1">
        <h1 className="logo1-h1">Logo</h1>
      </div>
      <div>
        {/* Muestra el botón correspondiente según el estado de autenticación */}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
}
