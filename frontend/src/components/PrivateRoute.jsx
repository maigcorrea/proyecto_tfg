import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { checkSession } from '../services/authService'; // Donde tienes la llamada a PHP

const PrivateRoute = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkSession()
      .then(response => {
        console.log(response.data); // Opcional, para debug 
        // console.log('Status:', response.status);
        // console.log('Status Text:', response.statusText);
        console.log('User data:', response.data.usuario);
        setLoggedIn(response.data.loggedIn); 
        console.log('Sesión activa', response.data.loggedIn)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error comprobando la sesión:', error);
        setLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute