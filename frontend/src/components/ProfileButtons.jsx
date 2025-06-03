import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkSession } from '../services/authService';
import { closeSes } from '../services/authService';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

const ProfileButtons = () => {
  const { userSession, setUserSession } = useContext(UserContext); // Contexto para manejar la sesión del usuario
    const navigate= useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
  console.log("Datos dentro del contexto", userSession);

    useEffect(() => {
        checkSession()
          .then(response => {
            console.log(response.data); // Opcional, para debug

            setUserSession({
              id:response.data.id,
              loggedIn: response.data.loggedIn,
              usuario: response.data.usuario,
              img: response.data.img,
              tipo: response.data.tipo,
            });

            console.log('User data:', response.data.usuario);
            console.log('Sesión activa', response.data.loggedIn);
            console.log("Imagen",response.data.img);
            
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error comprobando la sesión:', error);
            setUserSession({ loggedIn: false, usuario: '', img: '' });
            setIsLoading(false);
          });
      }, []);

  const cerrarSesion = () =>{
    closeSes().then(response =>{
      console.log(response);
      setUserSession({ loggedIn: false, usuario: '', img: '' });
      //Redireccionar o recargar página
      navigate("/");
      window.location.reload();
    });
  }
  

  return (
    <>
     <div className='flex justify-items-end w-[50%]'>
            <ul className='flex gap-4'>
                {/* Una vez que el usuario se ha autenticado estos link desaparecerán y se verá una foto de perfil del usuario */}
                {/* Botón de cerrar sesión */}
                {userSession.loggedIn ? <button onClick={cerrarSesion}>Cerrar Sesión</button> : <Link to='/login'>Iniciar Sesión</Link>}
                {/* <Link to='/login'>Iniciar Sesión</Link> */}
                {/* Foto del usuario y desplegable con opciones al hacer hover sobre la foto*/}
                {userSession.loggedIn ? userSession.img!=null ? <Link to="/my-profile"><img src={`/userAssets/${userSession.id}/${userSession.img}`} className="w-10 h-10 rounded-full object-cover cursor-pointer"/></Link> : <Link to={"/my-profile"}><img src={`/userAssets/default/defaultImg.png`} className="w-10 h-10 rounded-full object-cover cursor-pointer"/></Link> : <Link to='/register'>Registrarse</Link>}
                {/* <Link to='/register'>Registrarse</Link> */}
            </ul>
        </div>
    </>
  )
}

export default ProfileButtons