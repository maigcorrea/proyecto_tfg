import React, { useEffect, useState } from 'react'
import { getDataProfile } from '../services/userService'

const ProfileUserData = () => {
  const [userData, setUserData] = useState(null);

   useEffect(() => {
      getDataProfile()
      .then(data => {
        console.log("Datos del perfil:", data);
        setUserData(data);
      })
      .catch(error => console.error(error));
    }, [])

console.log("User data",userData);

if (!userData) return <p>Cargando datos...</p>;

    
  return (
    <>
      <h1 className='text-7xl m-6'>HOLAAAA</h1>
      <form action="" className='flex flex-col gap-4 w-fit'>
        <h1 className='text-3xl'>Datos de usuario</h1>
        {Object.entries(userData).map(([clave, valor]) => (
          <div className='flex flex-col gap-2' key={clave}>
            <label htmlFor={clave}>{clave}</label>
            <div className='flex gap-2'>
              <input type='text' value={valor} name={clave} className='border p-2' disabled></input>
              <button className='rounded-3xl bg-cyan-700 p-3 cursor-pointer hover:bg-blue-600'>Editar</button>
            </div>
          </div>
        ))}
      </form>
    </>
  )
}

export default ProfileUserData