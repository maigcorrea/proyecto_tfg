import React, { useEffect, useState, useContext } from 'react'
import { checkSession } from '../services/authService';
import { UserContext } from '../../context/UserrContext';

const WelcomeMessage = () => {
    // Comprobar si hay una sesión y sacar los datos del usuario del contexto
    const { userSession, setUserSession } = useContext(UserContext);

  return (
    <>
        {userSession.loggedIn ? <p>Hola {userSession.usuario}</p> : null}
    </>
  )
}

export default WelcomeMessage