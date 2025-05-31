import React, { useEffect, useState } from 'react'
import { getAllTotalPosts } from '../../services/postService';

const PostTable = () => {
    const [posts, setPosts] = useState([]);
    //Paginación
    const [totalPosts, setTotalPosts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
       const obtenerPosts = async () => {
        const offset = (currentPage - 1) * limit;
            try {
                const response = await getAllTotalPosts(limit, offset);
                console.log("RESPUESTA POST",response);
                setPosts(response);
                setTotalPosts(response.total);
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            }
       }

       obtenerPosts();
    }, [currentPage]);

    //Paginación
    const totalPages = Math.ceil(totalPosts / limit);
    
  return (
    <>
        <table className='text-center'>
        <thead>
          <th>#id</th>
          <th>Contenido</th>
          <th>Fecha creación</th>
          <th>Hora creación</th>
          <th>Usuario</th>
          <th>Total likes</th>
          <th>Total comentarios</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          posts.posts && posts.posts.map((post) => (
            <tr>
              <td><a href="" className='hover:text-blue-500'>{post.id}</a></td>
              <td>{post.contenido}</td>
              <td>{post.fecha.split(' ')[0]}</td>
              <td>{post.fecha.split(' ')[1]}</td>
              <td>@{post.nickname}</td>
              <td>{post.likesCount === 0 ? '---' : post.likesCount}</td>
              <td>{post.commentsCount === 0 ? '---' : post.commentsCount}</td>
              <td className='flex gap-2'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>Editar</button><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>Eliminar</button></td>
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
    </>
  )
}

export default PostTable