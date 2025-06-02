import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserrContext'
import DeleteCommentButton from './DeleteCommentButton';

const CommentsMadeByUser = ({comments, idUsuario, setComments}) => {
  const { userSession } = useContext(UserContext);
  return (
    <>
    <h1 className='text-2xl font-bold'>COMENTARIOS REALIZADOS</h1>
        {Array.isArray(comments) && comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className='border border-gray-300 p-4'>
            <p>Contenido del comentario: {comment.contenido}</p>
            <p>Fecha del comentario: {comment.fecha}</p>
            <p>Contenido del post: {comment.post_contenido}</p>

            {/* Visualización del botón "Eliminar" solo si el usuario que está consultando la información es el mismo que ha creado el comentario */}
            {userSession.id === idUsuario && <DeleteCommentButton commentId={comment.id} setComments={setComments} comments={comments}></DeleteCommentButton>}
          </div>
        ))
      ) : (
        <p>No hay comentarios para mostrar.</p>
      )}
    </>
  )
}

export default CommentsMadeByUser