import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/userService';
import { deleteUser } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación
  const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para eliminación
  const limit = 10;

  useEffect(() => {
    const obtenerUsuarios = async () =>{
      const offset = (currentPage - 1) * limit;
      const response = await getAllUsers(limit, offset);
      console.log("RESPUESTAAA",response);
      setUsers(response.usuarios);
      setTotalUsers(response.total);
    }

    obtenerUsuarios();
  }, [currentPage]);


  //Paginación
  const totalPages = Math.ceil(totalUsers / limit);

console.log("AAAAAAAAAA",users);
  const handleDelete = async(userId) => {
    try {
      setIsDeleting(true); // Inicia el spinner
      const response = await deleteUser(userId);
      setMessage(response.message);
      if(response.success){
        setUsers(users.filter(user => user.id !== userId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
      }

    } catch (error) {
      console.log(error);
    }finally {
      setIsDeleting(false); // Finaliza el spinner
      setConfirmDeleteId(null); // Cierra el modal después de eliminar
    }
  }

  return (
    <>
      <table>
        <thead>
          <th></th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Nacimiento</th>
          <th>Teléfono</th>
          <th>Tags</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          users && users.map((user) => (
            <tr>
              <td><img src={`../../public/userAssets/${user.id}/${user.img}`} alt={user.nickname} className='w-10 h-10 rounded-full' /></td>
              <td>{user.nickname}</td>
              <td>{user.nombre}</td>
              <td>{user.nacimiento}</td>
              <td>{user.telefono}</td>
              <td>{user.tags}</td>
              <td>{user.descripcion}</td>
              <td className='flex gap-2'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => { console.log("editar")}}>Editar</button><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(user.id)}}>Eliminar</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>

      {/* Paginación */}
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Siguiente
      </button>
    </div>

      <p>{message}</p>


      {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : "Sí, eliminar"}
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setConfirmDeleteId(null)} disabled={isDeleting}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserManagement