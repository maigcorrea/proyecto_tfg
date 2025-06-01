import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserrContext'
import DeletePostButton from './DeletePostButton';

const PostMadeByUser = ({postCreated, idUsuario, setPostCreated}) => {
    const { userSession } = useContext(UserContext);
  return (
    <>
        <h2 className='text-2xl font-bold'>POST QUE HA CREADO</h2>
        
        {Array.isArray(postCreated) && postCreated.length > 0 ? (
            postCreated.map(post => (
                <div key={post.id} className='border border-gray-300 p-4'>
                    <p>Contenido del post: {post.contenido}</p>
                    <p>Fecha del post: {post.fecha}</p>

                    {/* Visualización del botón "Eliminar" solo si el usuario que está consultando la información es el mismo que ha creado el post */}
                    {userSession.id === idUsuario && <DeletePostButton postId={post.id} setPostCreated={setPostCreated} postCreated={postCreated}></DeletePostButton>}
                </div>
            ))
        ) : (
            <p>No ha creado ningun post</p>
        )}
    </>
  )
}

export default PostMadeByUser