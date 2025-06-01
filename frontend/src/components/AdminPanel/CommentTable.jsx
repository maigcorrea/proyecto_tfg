import React, { useEffect, useState } from 'react'
import { getAllComments } from '../../services/commentService';

const CommentTable = () => {
    const [comments, setComments] = useState([]);
    //Paginación
    const [totalComments, setTotalComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
      const getComments = async () => {
        const offset = (currentPage - 1) * limit;
        console.log("OFFSET",offset);
        console.log("LIMIT",limit);
          try {
            const response = await getAllComments(limit, offset);
            console.log("COMENTARIOS",response);
            setComments(response.comments);
            setTotalComments(response.total);
          } catch (error) {
            console.error('Error al obtener los comentarios:', error);
          }
      }

      getComments();
    }, [currentPage]);

    //Paginación
    const totalPages = Math.ceil(totalComments / limit);
    
  return (
    <>
        <table className='text-center w-full'>
        <thead>
          <th>Usuario</th>
          <th>Post</th>
          <th>Contenido</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          comments && comments.map((comment) => (
            <tr>
              <td><a href="" className='hover:text-blue-500'>{comment.usuario_nombre}</a></td>
              <td>{comment.post_contenido}</td>
              <td>{comment.contenido}</td>
              <td>{comment.fecha.split(' ')[0]}</td>
              <td>{comment.fecha.split(' ')[1]}</td>
              <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(user.id)}}>Eliminar</button></td>
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
            className="px-4 py-2 bg-gray-300 rounded mx-1">
            Anterior
        </button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded mx-1">
            Siguiente
        </button>
        </div>
    </>
  )
}

export default CommentTable