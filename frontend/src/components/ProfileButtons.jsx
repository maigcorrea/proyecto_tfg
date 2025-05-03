import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkSession } from '../services/authService';
import { closeSes } from '../services/authService';
import { useNavigate } from "react-router";

const ProfileButtons = () => {
    const navigate= useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [img, setImg] = useState(null);
    const [usu, setUsu] = useState("");


    useEffect(() => {
        checkSession()
          .then(response => {
            console.log(response.data); // Opcional, para debug
            // console.log('Status:', response.status);
            // console.log('Status Text:', response.statusText);
            console.log('User data:', response.data.usuario);
            setLoggedIn(response.data.loggedIn); 
            console.log('Sesión activa', response.data.loggedIn)
            setUsu(response.data.usuario);
            setImg(response.data.img);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error comprobando la sesión:', error);
            setLoggedIn(false);
            setIsLoading(false);
          });
      }, []);

const [cerrar, setCerrar] = useState(false);
  const cerrarSesion = () =>{
    closeSes().then(response =>{
      // setCerrar(response);
      console.log(response);
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
                {loggedIn ? <button onClick={cerrarSesion}>Cerrar Sesión</button> : <Link to='/login'>Iniciar Sesión</Link>}
                {/* <Link to='/login'>Iniciar Sesión</Link> */}
                {/* Foto del usuario y desplegable con opciones al hacer hover sobre la foto*/}
                {loggedIn ? img!=null ? <img src={`../userAssets/${usu}/${img}`} className="w-10 h-10 rounded-full object-cover cursor-pointer"/> :<p>Foto</p> : <Link to='/register'>Registrarse</Link>}
                {/* <Link to='/register'>Registrarse</Link> */}
            </ul>
        </div>
    </>
  )
}

export default ProfileButtons