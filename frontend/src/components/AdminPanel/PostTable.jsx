import React, { useEffect, useState } from 'react'
import { getAllTotalPosts } from '../../services/postService';
import { deletePost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';

const PostTable = ({selectedUserId, currentPage, setCurrentPage}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true); //Sale el mensaje de carga
            try {
                const response = await getAllTotalPosts(limit, offset, selectedUserId);
                console.log("RESPUESTA POST",response.posts);
                setPosts(response.posts);
                setTotalPosts(response.total);

                // Si estamos en una página que ya no existe después del filtro, volvemos a la 1
                const totalPagesAfterChange = Math.ceil(response.total / limit);
                if (currentPage > totalPagesAfterChange) {
                  setCurrentPage(1);
                }
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            }finally {
              setIsLoading(false);
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
    {isLoading ? (
      <div className="text-center p-4">
        <p className="text-gray-600">Cargando publicaciones...</p>
      </div>
    ) : 
        posts.length === 0 ? (
  <div className="text-center p-4">
    <p className="text-gray-600">No hay publicaciones para mostrar para el usuario seleccionado.</p>
  </div>
) : (
  <>
    
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isLoading ? (
          <div className="text-center p-4 text-gray-600">Cargando publicaciones...</div>
        ) : posts.length === 0 ? (
          <div className="text-center p-4 text-gray-600">
            No hay publicaciones para mostrar para el usuario seleccionado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200">
              {/* Encabezados */}
              <div className="hidden md:grid md:grid-cols-12 bg-gray-50 rounded-t-lg">
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1 m-auto">#ID</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-3 m-auto">Contenido</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2 m-auto">Fecha</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2 m-auto">Usuario</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1 m-auto">Likes</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1 m-auto">Comentarios</div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2 m-auto">Acciones</div>
              </div>


              {/* Contenido */}
              <div className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post.id} className="grid grid-cols-1 md:grid-cols-12 hover:bg-gray-50 transition-colors">
                    
                    <div className="hidden md:block px-4 py-3 col-span-1 text-sm text-gray-900">#{post.id}</div>

                    <div className='col-span-3'>
                      <div className="md:hidden text-xs text-gray-500 mt-2 text-center">Contenido</div>
                      <div className="px-4 py-3 text-sm text-gray-900 truncate">{post.contenido}</div>
                    </div>

                  <div className='col-span-2'>
                    <div className="md:hidden text-xs text-gray-500 mt-2 text-center">Fecha</div>
                    <div className="px-4 py-3 text-sm text-gray-900">
                      {post.fecha.split(' ')[0]} <br className="md:hidden" /> {post.fecha.split(' ')[1]}
                    </div>
                  </div>

                  <div className='col-span-2'>
                    <div className="md:hidden text-xs text-gray-500 mt-2 text-center">Usuario</div>
                    <div className="px-4 py-3 text-sm text-gray-900">{post.nickname}</div>
                  </div>
                    
                  <div className='col-span-1'>
                    <div className="md:hidden text-xs text-gray-500 mt-2 text-center">Likes</div>
                    <div className="px-4 py-3 text-sm text-gray-900">{post.likesCount || '---'}</div>
                  </div>
                    
                  <div className='col-span-1'>
                    <div className="md:hidden text-xs text-gray-500 mt-2 text-center">Comentarios</div>
                    <div className="px-4 py-3 text-sm text-gray-900">{post.commentsCount || '---'}</div>
                  </div>
                    

                    <div className="px-4 py-3 col-span-12 md:col-span-2 flex space-x-2 md:m-auto">
                      <button
                        onClick={() => navigate(`/admin/post/${post.id}`)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-white bg-[#4c7389] hover:bg-[#3a5a6d] focus:outline-none"
                      >
                        Detalles
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(post.id)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Paginación */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{(currentPage - 1) * limit + 1}</span> a <span className="font-medium">{Math.min(currentPage * limit, totalPosts)}</span> de <span className="font-medium">{totalPosts}</span> publicaciones
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
            >
              Anterior
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
            >
              Siguiente
            </button>
          </div>
        </div>

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
      </div>
    
  </>
)}

    
    </>
  )
}

export default PostTable