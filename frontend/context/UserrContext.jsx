import { createContext, useEffect, useState } from 'react';
import { checkSession } from '../src/services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    loggedIn: false,
    id:'',
    usuario: '',
    nombre:'',
    img: '',
    tags: [],
    tipo: "",
  });

  // Comprobar si hay una sesión activa al cargar el componente
  useEffect(() => {
    checkSession()
      .then(res => {
        if (res.data.loggedIn) {
          setUserSession({
            loggedIn: true,
            id: res.data.id,
            usuario: res.data.usuario,
            nombre: res.data.nombre,
            img: res.data.img,
            tags: res.data.tags || [],
            tipo: res.data.tipo,
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
