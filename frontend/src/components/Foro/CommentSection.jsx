import React, {useState, useEffect} from 'react'
import { createComment } from '../../services/commentService';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserrContext'
import { getCommentsByPost } from '../../services/commentService';

const CommentSection = ({postId, setCommentsCount }) => {
  const { userSession } = useContext(UserContext);
  const [comentario, setComentario] = useState('');
  const [mostrarMas, setMostrarMas] = useState(3);
  const [comentarios, setComentarios] = useState([]);

  // Cargar comentarios reales al montar el componente
  useEffect(() => {
    const cargarComentarios = async () => {
      try {
        const response = await getCommentsByPost(postId);
        if (response.success) {
          setComentarios(response.comments);
        } else {
          console.error('Error al obtener comentarios:', response);
        }
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };
    cargarComentarios();
  }, [postId]);

  const handleEnviar = async () => {
    if (comentario.trim()) {
      const formData = new FormData();
      formData.append('contenido', comentario);
      formData.append('postId', postId);

      // Aquí se llamaría al servicio para crear el comentario
      try {
        const response = await createComment(formData);
        console.log('Comentario creado:', response);

        if (response.success) {
          //Aquí se actualizaría el estado local del numero de comentarios que tiene el post
          setCommentsCount(prev => prev + 1);

          // Después de crear, recargar los comentarios del backend
          const updatedCommentsResponse = await getCommentsByPost(postId);
          console.log('Comentarios actualizados:', updatedCommentsResponse.comments);
          setComentarios(updatedCommentsResponse.comments);
          setComentario('');
          console.log('Comentarios:', comentarios);

          //AQUÍ
          // Actualizar estado global creando un CommentContext????
        } else {
          console.error('Error al crear comentario:', response);
        }
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:border-[#a1c7c0] focus:ring-1 focus:ring-[#a1c7c0] transition-all placeholder-gray-400 bg-white"
            placeholder="Añade un comentario..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
            maxLength={80}
          />
          <button
            onClick={handleEnviar}
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow transition-all duration-200
              ${comentario.trim() ? 'bg-gradient-to-r from-[#a1c7c0] to-[#a1c7c0] text-black hover:from-[#6c837f] hover:to-[#6c837f] scale-105 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!comentario.trim()}
            title="Enviar comentario"
          >
            Enviar
          </button>
        </div>
        <div className="space-y-3">
          {comentarios.slice(0, mostrarMas).map((c) => (
            <div key={c.id} className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-black text-sm">{c.usuario_nombre}</span>
                <span className="text-xs text-gray-400">{c.fecha}</span>
              </div>
              <span className="text-gray-800 text-sm">{c.contenido}</span>
            </div>
          ))}
          {comentarios.length > mostrarMas && (
            <button
              className="text-sm text-black hover:underline hover:text-black transition cursor-pointer mt-1"
              onClick={() => setMostrarMas(prev => prev + 3)}
            >
              Mostrar más comentarios
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default CommentSection