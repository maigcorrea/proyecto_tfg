import React from 'react';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';

const LikedPostByUser = ({ postLiked }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full border-l-4 border-pink-500 ">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-pink-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          
          Publicaciones a las que el usuario le dio "Me gusta"
        </h2>
        {postLiked?.length > 0 && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {postLiked.length} {postLiked.length === 1 ? 'like' : 'likes'}
          </span>
        )}
      </div>
      
      {Array.isArray(postLiked) && postLiked.length > 0 ? (
        <div className="space-y-4">
          {postLiked.map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-1 w-[50%]">
                  <p className="text-gray-700 mb-2 truncate">{post.contenido}</p>
                  <div className="flex items-center text-sm text-gray-500">
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">El usuario no ha dado like a ninguna publicación.</p>
        </div>
      )}
    </div>
  )
}

export default LikedPostByUser