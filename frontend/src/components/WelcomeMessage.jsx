import React, { useEffect, useState } from 'react'
import { checkSession } from '../services/authService';

const WelcomeMessage = () => {
    // Comprobar si hay una sesión
    const [loggedIn, setLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState("");

    useEffect(() => {
      checkSession()
        .then(response => {
          console.log(response.data); // Opcional, para debug
          // console.log('Status:', response.status);
          // console.log('Status Text:', response.statusText);
          console.log('User data:', response.data.usuario);
          setLoggedIn(response.data.loggedIn);
          setUsuario(response.data.usuario); 
          console.log('Sesión activa', response.data.loggedIn)
        })
        .catch(error => {
          console.error('Error comprobando la sesión:', error);
          setLoggedIn(false);
        });
    }, []);
  return (
    <>
        {loggedIn ? <p>Hola {usuario}</p> : null}
    </>
  )
}

export default WelcomeMessage