import React from 'react';
import { FaComment, FaUser, FaCalendarAlt } from 'react-icons/fa';

const CommentedPostByUser = ({ postCommented }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full border-l-4 border-green-500 ">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          
          Publicaciones comentadas por el usuario
        </h2>
        {postCommented?.length > 0 && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {postCommented.length} {postCommented.length === 1 ? 'comentario' : 'comentarios'}
          </span>
        )}
      </div>
      
      {Array.isArray(postCommented) && postCommented.length > 0 ? (
        <div className="space-y-4">
          {postCommented.map((post, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="mb-3 w-[50%]">
                <p className="text-gray-700 truncate">{post.contenido}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>{post.autor_nickname}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{new Date(post.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">El usuario no ha comentado ninguna publicación.</p>
        </div>
      )}
    </div>
  )
}

export default CommentedPostByUser