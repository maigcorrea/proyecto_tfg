import React, { useState } from 'react'

const CommentedPostByUser = ({postCommented}) => {

  return (
    <>
    <h2 className='text-2xl font-bold'>POST COMENTADOS</h2>
    {Array.isArray(postCommented) && postCommented.map((postCommente) => (
        <div>
            <ul>
                <li>{postCommente.contenido}</li>
                <li>{postCommente.autor_nickname}</li>
                <li>{postCommente.fecha}</li>
            </ul>
            <hr />
        </div>
    ))}


    {postCommented.length === 0 && <p>No hay post comentados</p>}
    
        
    </>
  )
}

export default CommentedPostByUser