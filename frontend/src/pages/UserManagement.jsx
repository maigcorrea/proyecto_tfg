import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/userService';
import { deleteUser } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación

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
    }finally {
      setConfirmDeleteId(null); // Cierra el modal después de eliminar
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
              <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(user.id)}}>Eliminar</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <p>{message}</p>


       {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Sí, eliminar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserManagement