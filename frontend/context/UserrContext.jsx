import { createContext, useEffect, useState } from 'react';
import { checkSession } from '../src/services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    loggedIn: false,
    usuario: '',
    img: '',
    tags: [],
  });

  useEffect(() => {
    checkSession()
      .then(res => {
        if (res.data.loggedIn) {
          setUserSession({
            loggedIn: true,
            usuario: res.data.usuario,
            img: res.data.img,
            tags: res.data.tags || [],
          });
        }
      })
      .catch(err => {
        console.error('Error al recuperar sesión:', err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
};
