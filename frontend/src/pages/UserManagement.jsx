import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/userService';
import { deleteUser } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () =>{
      const response = await getAllUsers();
      setUsers(response);
    }

    obtenerUsuarios();
  }, []);


  const handleDelete = async(userId) => {
    try {
      const response = await deleteUser(userId);
      setMessage(response.message);
      if(response.success){
        setUsers(users.filter(user => user.id !== userId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <table>
        <thead>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Nacimiento</th>
          <th>Teléfono</th>
          <th>Tags</th>
          <th>Descripción</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
        {
          users && users.map((user) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.nombre}</td>
              <td>{user.nacimiento}</td>
              <td>{user.telefono}</td>
              <td>{user.tags}</td>
              <td>{user.descripcion}</td>
              <td><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => { console.log("editar")}}>Editar</button></td>
              <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {handleDelete(user.id)}}>Eliminar</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <p>{message}</p>
    </>
  )
}

export default UserManagement