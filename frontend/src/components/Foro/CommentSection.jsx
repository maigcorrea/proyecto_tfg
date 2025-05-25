import React, {useState} from 'react'
import { createComment } from '../../services/commentService';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserrContext'

const CommentSection = ({postId}) => {
  const { userSession } = useContext(UserContext);
  const [comentario, setComentario] = useState('');
  const [mostrarMas, setMostrarMas] = useState(3);
  const [comentarios, setComentarios] = useState([
    // temporalmente simulados
    { usuario: 'ana', texto: '¡Me encanta!', tiempo: '3 min' },
    { usuario: 'pablo', texto: 'Totalmente de acuerdo', tiempo: '5 min' },
    { usuario: 'luis', texto: 'Gracias por compartir', tiempo: '10 min' },
    { usuario: 'laura', texto: 'Buen post!', tiempo: '12 min' },
  ]);

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
          // Añadir el nuevo comentario al inicio
          setComentarios(prev => [
            {
              usuario: userSession.nombre || userSession.usuario,
              texto: comentario,
              tiempo: 'ahora',
            },
            ...prev,
          ]);
          setComentario('');

          //AQUÍ
          // Actualizar estado global creando un CommentContext????
        } else {
          console.error('Error al crear comentario:', response);
        }
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }

      //Mostrar comentario (localmente) que se acaba de crear
      setComentarios(prev => [
        { usuario: 'yo', texto: comentario, tiempo: 'ahora' },
        ...prev
      ]);
      setComentario('');
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
        {comentarios.slice(0, mostrarMas).map((c, i) => (
          <div key={i} className="text-sm border-b pb-1">
            <span className="font-semibold">{c.usuario}</span>: {c.texto} <span className="text-xs text-gray-400">({c.tiempo})</span>
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