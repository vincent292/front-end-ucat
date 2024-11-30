import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

interface Props {
  children: React.ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="dev-y3abbnszltzzyp67.us.auth0.com" // Reemplaza con tu dominio Auth0
      clientId="mA15AjMSLHIzjFadXRGFeBzOb3JOedMd" // Reemplaza con tu clientId de Auth0
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
