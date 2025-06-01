import React from 'react'

const CommentsMadeByUser = ({comments}) => {
  return (
    <>
    <h1 className='text-2xl font-bold'>COMENTARIOS REALIZADOS</h1>
        {Array.isArray(comments) && comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className='border border-gray-300 p-4'>
            <p>Contenido del comentario: {comment.contenido}</p>
            <p>Fecha del comentario: {comment.fecha}</p>
            <p>Contenido del post: {comment.post_contenido}</p>
          </div>
        ))
      ) : (
        <p>No hay comentarios para mostrar.</p>
      )}
    </>
  )
}

export default CommentsMadeByUser