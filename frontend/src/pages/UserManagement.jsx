import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState(second);

  useEffect(() => {
    const obtenerUsuarios = async () =>{
      const response = await getAllUsers();
      console.log(response); 
    }
  }, []);
  return (
    <>
        <h1>PANEL USUARIOS</h1>
    </>
  )
}

export default UserManagement