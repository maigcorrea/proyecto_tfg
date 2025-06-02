import React, { useEffect, useState } from 'react'
import { deleteComment } from '../../services/commentService';

const DeleteCommentButton = ({commentId, setComments, comments, setFilteredComments, filteredComments}) => {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState("");
    

    const handleDelete = async(id) => {
        try {
            setIsDeleting(true); // Inicia el spinner
            console.log("SE DEBERÍA BORRAR EL POST", id);
            const response = await deleteComment(id);
            console.log(response);
            setMessage(response.message);
            
            if(response.success){
                setComments(comments.filter(comment => comment.id !== id)); //Simulado localmente en vez de cargar todos los comentarios de nuevo
                setFilteredComments(filteredComments.filter(comment => comment.id !== id)); // También actualiza filtrados
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
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(commentId)}}>Eliminar</button>

        {/* Modal de confirmación */}
        {confirmDeleteId !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <p>¿Estás seguro de que quieres eliminar este comentario?</p>
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

        {/* Toast en el futuro */}
        <p>{message}</p>

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

export default DeleteCommentButton