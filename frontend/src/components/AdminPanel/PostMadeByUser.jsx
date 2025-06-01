import React from 'react'

const PostMadeByUser = ({postCreated}) => {
  return (
    <>
        <h2 className='text-2xl font-bold'>POST QUE HA CREADO</h2>
        {Array.isArray(postCreated) && postCreated.length > 0 ? (
            postCreated.map(post => (
                <div key={post.id} className='border border-gray-300 p-4'>
                    <p>Contenido del post: {post.contenido}</p>
                    <p>Fecha del post: {post.fecha}</p>
                </div>
            ))
        ) : (
            <p>No ha creado ningun post</p>
        )}
    </>
  )
}

export default PostMadeByUser