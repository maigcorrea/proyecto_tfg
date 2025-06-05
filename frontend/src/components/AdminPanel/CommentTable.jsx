import React, { useEffect, useState } from 'react'
import { getAllComments } from '../../services/commentService';
import DeleteCommentButton from './DeleteCommentButton';
import Toast from '../UI/Toast';

const CommentTable = () => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');
    //Paginación
    const [totalComments, setTotalComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    //Búsqueda
    const [search, setSearch] = useState('');
    const [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
      const getComments = async () => {
        const offset = (currentPage - 1) * limit;
        try {
          const response = await getAllComments(limit, offset);
          setComments(response.comments);
          setFilteredComments(response.comments);
          setTotalComments(response.total);
        } catch (error) {
          console.error('Error al obtener los comentarios:', error);
          setMessage('Error al cargar los comentarios');
        }
      }

      getComments();
    }, [currentPage]);

    //Filtrado por contenido
    useEffect(() => {
      const filtered = comments.filter(comment => 
        comment.contenido.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredComments(filtered);
    }, [search, comments]);
    
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="text-gray-400 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por contenido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4c7389] focus:border-[#4c7389] sm:text-sm"
          />
        </div>

        {/* Tabla responsive */}
        <div className="overflow-x-auto">
          <div className="min-w-full divide-y divide-gray-200">
            {/* Encabezados - visible en desktop */}
            <div className="hidden md:grid md:grid-cols-12 bg-gray-50 rounded-t-lg">
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Usuario</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Post</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-4">Contenido</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Fecha</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1">Hora</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1">Acciones</div>
            </div>

            {/* Cuerpo de la tabla */}
            <div className="bg-white divide-y divide-gray-200">
              {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-col md:grid md:grid-cols-12 hover:bg-gray-50 transition-colors border-b md:border-0"
                  >
                    {/* Usuario */}
                    <div className="px-4 py-2 md:py-3 md:col-span-2 flex md:block">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Usuario:</span>
                      <span className="text-sm font-medium text-gray-900">{comment.usuario_nombre}</span>
                    </div>
                    {/* Post */}
                    <div className="px-4 py-2 md:py-3 md:col-span-2 flex md:block">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Post:</span>
                      <span className="text-sm text-gray-900">{comment.post_contenido}</span>
                    </div>
                    {/* Contenido */}
                    <div className="px-4 py-2 md:py-3 md:col-span-4 flex md:block">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Contenido:</span>
                      <span className="text-sm text-gray-900 break-words">{comment.contenido}</span>
                    </div>
                    {/* Fecha */}
                    <div className="px-4 py-2 md:py-3 md:col-span-2 flex md:block">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Fecha:</span>
                      <span className="text-sm text-gray-900">{comment.fecha?.split(' ')[0] || ''}</span>
                    </div>
                    {/* Hora */}
                    <div className="px-4 py-2 md:py-3 md:col-span-1 flex md:block">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Hora:</span>
                      <span className="text-sm text-gray-900">{comment.fecha?.split(' ')[1] || ''}</span>
                    </div>
                    {/* Acciones */}
                    <div className="px-4 py-2 md:py-3 md:col-span-1 flex items-center md:justify-center">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Acciones:</span>
                      <DeleteCommentButton 
                        commentId={comment.id} 
                        setComments={setComments} 
                        comments={comments} 
                        setFilteredComments={setFilteredComments} 
                        filteredComments={filteredComments}
                        setMessage={setMessage}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No se encontraron comentarios
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{(currentPage - 1) * limit + 1}</span> a <span className="font-medium">{Math.min(currentPage * limit, totalComments)}</span> de <span className="font-medium">{totalComments}</span> comentarios
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
              disabled={currentPage === Math.ceil(totalComments / limit)}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(totalComments / limit) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
            >
              Siguiente
            </button>
          </div>
        </div>
      
        {/* Toast de notificación */}
        <Toast 
          message={message} 
          type={message?.includes('Error') ? 'error' : 'success'}
          onClose={() => setMessage('')} 
        />
      </div>
    );
  };

export default CommentTable;
