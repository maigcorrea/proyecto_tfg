import React, { useEffect, useState } from 'react'
import { getAllTotalPosts } from '../../services/postService';

const PostTable = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       const obtenerPosts = async () => {
            try {
                const response = await getAllTotalPosts();
                console.log("RESPUESTA POST",response);
                setPosts(response);
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            }
       }

       obtenerPosts();
    }, [])
    
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
    </>
  )
}

export default PostTable