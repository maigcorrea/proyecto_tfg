import React from 'react'

const LikedPostByUser = ({postLiked}) => {
  return (
    <>
        <h2 className='text-2xl font-bold'>POST A LOS QUE HA DADO LIKE</h2>
        {Array.isArray(postLiked) && postLiked.length > 0 ? (
            postLiked.map(post => (
                <div key={post.id} className='border border-gray-300 p-4'>
                    <p>Contenido del post: {post.contenido}</p>
                    <p>Fecha del post: {post.fecha}</p>
                </div>
            ))
        ) : (
            <p>No le ha dado like a ningún post</p>
        )}
    </>
  )
}

export default LikedPostByUser