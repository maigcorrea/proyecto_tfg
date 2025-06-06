import React, { useContext, useState } from 'react'
import { deletePost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserrContext';

const DeletePostButton = ({ postId, setPostCreated, postCreated, setMessage }) => {
  const { userSession } = useContext(UserContext);
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const response = await deletePost(id);
      
      if (setMessage) {
        setMessage(response.message, response.success ? 'success' : 'error');
      } else {
        alert(response.message);
      }

      if (response.success) {
        if (userSession.tipo === "admin") {
          // Small delay to show the success message before navigating
          setTimeout(() => navigate("/admin/posts"), 1500);
        } else if (setPostCreated && postCreated) {
          setPostCreated(postCreated.filter(post => post.id !== postId));
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      if (setMessage) {
        setMessage("Error al eliminar la publicación", 'error');
      }
    } finally {
      setIsDeleting(false);
      setConfirmDeleteId(null);
    }
  }
  return (
    <>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(postId)}}>Eliminar publicación</button>
    
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


        {/* Spinner de carga */}
        {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      )}
    </>
  )
}

export default DeletePostButton