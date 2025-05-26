import React, {useState, useEffect} from 'react'
import { createComment } from '../../services/commentService';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserrContext'
import { getCommentsByPost } from '../../services/commentService';

const CommentSection = ({postId}) => {
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
      <input
        type="text"
        className="w-full border px-2 py-1 rounded text-sm"
        placeholder="Añade un comentario..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
      />
      <div className="mt-2 space-y-2">
        {comentarios.slice(0, mostrarMas).map((c) => (
          <div key={c.id} className="text-sm border-b pb-1">
            <span className="font-semibold">{c.usuario_nombre}</span>: {c.contenido} <span className="text-xs text-gray-400">({c.fecha})</span>
          </div>
        ))}
        {comentarios.length > mostrarMas && (
          <button
            className="text-blue-500 text-xs mt-1"
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