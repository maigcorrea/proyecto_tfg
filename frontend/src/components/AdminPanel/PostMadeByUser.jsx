import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserrContext';
import DeletePostButton from './DeletePostButton';
import { FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import Toast from '../UI/Toast';

const PostMadeByUser = ({ postCreated, idUsuario, setPostCreated }) => {
  const { userSession } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // setMessage compatible with both (msg, type) and (msg)
  const handleSetMessage = (msg, type = 'success') => {
    setMessage(msg);
    setToastType(type);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full border-l-4 border-blue-500 ">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          Publicaciones creadas
        </h2>
        {postCreated?.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {postCreated.length} {postCreated.length === 1 ? 'publicación' : 'publicaciones'}
          </span>
        )}
      </div>
      
      {Array.isArray(postCreated) && postCreated.length > 0 ? (
        <div className="space-y-4">
          {postCreated.map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className='w-[50%]'>
                  <p className="text-gray-700 mb-2 truncate">{post.contenido}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    
                    <span>{new Date(post.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
                {userSession.id === idUsuario && (
                  <DeletePostButton 
                    postId={post.id} 
                    setPostCreated={setPostCreated} 
                    postCreated={postCreated} 
                    setMessage={handleSetMessage}
                    className="text-red-600 hover:text-red-800"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">El usuario no ha creado ninguna publicación aún.</p>
        </div>
      )}
      {/* Toast notification */}
      <Toast 
        message={message} 
        type={toastType}
        onClose={() => setMessage("")}
      />
    </div>
  )
}

export default PostMadeByUser