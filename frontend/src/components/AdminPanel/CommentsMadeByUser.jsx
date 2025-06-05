import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserrContext';
import DeleteCommentButton from './DeleteCommentButton';
import { FaComment, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

const CommentsMadeByUser = ({ comments, idUsuario, setComments }) => {
  const { userSession } = useContext(UserContext);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full border-l-4 border-purple-500 ">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-purple-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          
          Comentarios realizados
        </h2>
        {comments?.length > 0 && (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
          </span>
        )}
      </div>
      
      {Array.isArray(comments) && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="mb-3">
                <p className="text-gray-700">{comment.contenido}</p>
              </div>
              
              <div className="mb-3 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  
                  <span className="font-medium">Publicación:</span>
                </div>
                <p className="text-sm text-gray-700 ml-6">{comment.post_contenido}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{new Date(comment.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                {userSession.id === idUsuario && (
                  <div className="ml-auto">
                    <DeleteCommentButton 
                      commentId={comment.id} 
                      setComments={setComments} 
                      comments={comments}
                      className="text-red-600 hover:text-red-800 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay comentarios para mostrar.</p>
        </div>
      )}
    </div>
  )
}

export default CommentsMadeByUser