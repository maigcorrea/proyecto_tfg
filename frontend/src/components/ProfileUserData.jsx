import React, { useEffect, useState } from 'react'
import { getDataProfile } from '../services/userService'

const ProfileUserData = () => {

   useEffect(() => {
      getDataProfile()
      .then(data => {
        console.log("Datos del perfil:", data);
      })
      .catch(error => console.error(error));
    }, [])
    
  return (
    <>
        <h1>hola</h1>
    </>
  )
}

export default ProfileUserData