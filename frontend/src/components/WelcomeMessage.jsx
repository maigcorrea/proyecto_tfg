import React, { useEffect, useState, useContext } from 'react'
import { checkSession } from '../services/authService';
import { UserContext } from '../../context/UserrContext';

const WelcomeMessage = () => {
    // Comprobar si hay una sesión
    const [loggedIn, setLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState("");

    const { userSession, setUserSession } = useContext(UserContext);

    useEffect(() => {
      checkSession()
        .then(response => {
          console.log(response.data); // Opcional, para debug
          // console.log('Status:', response.status);
          // console.log('Status Text:', response.statusText);
          console.log('User data:', response.data.usuario);
          setLoggedIn(response.data.loggedIn);
          setUsuario(response.data.usuario); 
          console.log('Sesión activa', response.data.loggedIn);

          setUserSession({
            loggedIn: response.data.loggedIn,
            usuario: response.data.usuario,
            img: response.data.img,
            tags: response.data.tags ? response.data.tags.split(',').map(t => t.trim()) : [],
          });
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