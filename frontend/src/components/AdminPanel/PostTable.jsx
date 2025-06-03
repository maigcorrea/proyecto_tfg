import React, { useEffect, useState } from 'react'
import { getAllTotalPosts } from '../../services/postService';
import { deletePost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';

const PostTable = ({selectedUserId, currentPage, setCurrentPage}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación
    const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para eliminación
    const [message, setMessage] = useState("");
    //Paginación
    const [totalPosts, setTotalPosts] = useState(0);
    //const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
       const obtenerPosts = async () => {
        const offset = (currentPage - 1) * limit;
            try {
                const response = await getAllTotalPosts(limit, offset, selectedUserId);
                console.log("RESPUESTA POST",response.posts);
                setPosts(response.posts);
                setTotalPosts(response.total);

                // Si estamos en una página que ya no existe después del filtro, volvemos a la 1
                const totalPagesAfterChange = Math.ceil(totalPosts / limit);
                if (currentPage > totalPagesAfterChange) {
                  setCurrentPage(1);
                }
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            }
       }

       obtenerPosts();
    }, [currentPage, selectedUserId]); //Vuelve a buscar si cambia el usuario del filtro

    //Paginación
    const totalPages = Math.ceil(totalPosts / limit);


    const handleDelete = async(postId) => {
        try {
          setIsDeleting(true); // Inicia el spinner
          console.log("SE DEBERÍA BORRAR EL POST", postId);
          const response = await deletePost(postId);
          console.log(response);
          setMessage(response.message);
          if(response.success){
            setPosts(posts.filter(post => post.id !== postId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
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
        {posts.length === 0 ? (
  <div className="text-center p-4">
    <p className="text-gray-600">No hay publicaciones para mostrar para el usuario seleccionado.</p>
  </div>
) : (
  <>
    <table className='text-center'>
      <thead>
        <tr>
          <th>#id</th>
          <th>Contenido</th>
          <th>Fecha creación</th>
          <th>Hora creación</th>
          <th>Usuario</th>
          <th>Total likes</th>
          <th>Total comentarios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td><a href="" className='hover:text-blue-500'>{post.id}</a></td>
            <td>{post.contenido}</td>
            <td>{post.fecha.split(' ')[0]}</td>
            <td>{post.fecha.split(' ')[1]}</td>
            <td>@{post.nickname}</td>
            <td>{post.likesCount === 0 ? '---' : post.likesCount}</td>
            <td>{post.commentsCount === 0 ? '---' : post.commentsCount}</td>
            <td className='flex gap-2'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                onClick={() => navigate(`/admin/post/${post.id}`)}
              >
                Detalles
              </button>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                onClick={() => setConfirmDeleteId(post.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
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
)}

    <p>{message}</p>

    {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>¿Estás seguro de que quieres eliminar esta publicación?</p>
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

export default PostTable