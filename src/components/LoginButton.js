import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../Styles/index.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='auth-buttons' onClick={() => loginWithRedirect()}>login</button>;
};

export default LoginButton;
