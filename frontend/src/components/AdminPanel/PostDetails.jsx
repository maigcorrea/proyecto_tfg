import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPostData } from '../../services/postService';
import DeleteCommentButton from './DeleteCommentButton';

const PostDetails = () => {
    const { id } = useParams(); // Obtenemos el id del post desde la URL
    const [postDetails, setPostDetails] = useState([]);
    const [likesDetails, setLikesDetails] = useState([]);
    const [commentsDetails, setCommentsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
      const getPostDetails = async () => {
          try {
            const response = await getPostData(id);
            console.log("YYYYYYY",response);
            setPostDetails(response.post);
            console.log("postDetails",response.post);
            setLikesDetails(response.likes);
            setCommentsDetails(response.comments);
            setLoading(false);
          } catch (error) {
            console.error("Error al obtener los detalles del post",error);
            setMessage("Error al obtener los detalles del post");
          }
      }

      getPostDetails();
    }, [])
    

  return (
    <>
        {postDetails &&
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex items-center space-x-3 mb-2 cursor-pointer">
                    <img
                        src={`/userAssets/${postDetails.user_id}/${postDetails.img}`}
                        alt={postDetails.nickname}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{postDetails.nombre} <span className="text-gray-500 text-sm">@{postDetails.nickname}</span></p>
                        <p className="text-xs text-gray-400">{postDetails.fecha}</p>
                    </div>
                </div>

                <p className="mb-2 text-gray-800">{postDetails.contenido}</p>
            </div>
        }


        <div className='flex flex-wrap '>
            <div className='w-1/2 border-2 border-gray-300'>
                <h2 className='text-center text-3xl font-semibold'>LIKES</h2>
                {likesDetails.map((like) => (
                    <div className="bg-white p-4 rounded shadow mb-4">
                        <div className="flex items-center space-x-3 mb-2 cursor-pointer w-full">
                            <img
                                src={`/userAssets/${like.id}/${like.img}`}
                                alt={like.nickname}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className='flex lg:flex-col w-full'>
                                <div className='inline-flex items-center justify-between'>
                                    <p className="font-semibold">{like.nombre} </p>
                                    <span className="text-gray-400 text-sm">{like.fecha}</span>
                                </div>
                                <p className="text-gray-500 text-sm">@{like.nickname}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className='w-1/2 border-2 border-gray-300'>
                <h2 className='text-center text-3xl font-semibold'>COMENTARIOS</h2>
                {commentsDetails.map((comment) => (
                    <div className="bg-white p-4 rounded shadow mb-4">
                        <div className="flex items-center space-x-3 mb-2 cursor-pointer w-full">
                            <img
                                src={`/userAssets/${comment.usuario_id}/${comment.img}`}
                                alt={comment.nickname}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className='flex lg:flex-col w-full'>
                                <div className='inline-flex items-center justify-between'>
                                    <p className="font-semibold">{comment.nombre} </p>
                                    <span className="text-gray-400 text-sm">{comment.fecha}</span>
                                </div>
                                <p className="text-gray-500 text-sm">@{comment.nickname}</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <p className="mb-2 text-gray-800">{comment.contenido}</p>
                            <DeleteCommentButton commentId={comment.id} setComments={setCommentsDetails} comments={commentsDetails}></DeleteCommentButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>


        {/* Si está cargando, mostrar un indicador */}
        {loading && (
            <div className="text-center mt-4">
                <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        )}
    </>
  )
}

export default PostDetails