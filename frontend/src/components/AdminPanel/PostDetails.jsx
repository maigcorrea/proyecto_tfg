import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPostData } from '../../services/postService';
import DeleteCommentButton from './DeleteCommentButton';
import Toast from '../UI/Toast';

const PostDetails = () => {
    const { id } = useParams(); // Obtenemos el id del post desde la URL
    const [postDetails, setPostDetails] = useState([]);
    const [likesDetails, setLikesDetails] = useState([]);
    const [commentsDetails, setCommentsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const handleShowToast = (msg, type = 'info') => {
        setMessage(msg);
        setToastType(type);
    };

    const handleCloseToast = () => {
        setMessage("");
        setToastType("");
    };

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
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="w-full max-w-full mx-auto space-y-8 p-6">
                {/* Estado de carga */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                ) : postDetails ? (
                    <>
                        {/* Tarjeta de la publicación principal */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={`/userAssets/${postDetails.user_id}/${postDetails.img}`}
                                            alt={postDetails.nickname}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/userAssets/default/defaultImg.png';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <h2 className="text-xl font-bold text-gray-900">
                                                {postDetails.nombre}
                                                <span className="text-gray-600 font-normal ml-2">@{postDetails.nickname}</span>
                                            </h2>
                                            <span className="text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(postDetails.fecha).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">{postDetails.contenido}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sección de interacciones */}
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Sección de Likes */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span>Usuarios que dieron Me Gusta</span>
                                        {likesDetails.length > 0 && (
                                            <span className="ml-2 bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                                {likesDetails.length}
                                            </span>
                                        )}
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {likesDetails.length > 0 ? (
                                        likesDetails.map((like, index) => (
                                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center">
                                                    <img
                                                        src={`/userAssets/${like.id}/${like.img}`}
                                                        alt={like.nickname}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/userAssets/default/defaultImg.png';
                                                        }}
                                                    />
                                                    <div className="ml-3 min-w-0">
                                                        <p className="text-base font-medium text-gray-900 truncate">{like.nombre}</p>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <span>@{like.nickname}</span>
                                                            <span className="mx-1">•</span>
                                                            <span>
                                                                {new Date(like.fecha).toLocaleDateString('es-ES', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center">
                                            <p className="text-gray-500">No hay likes en esta publicación</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sección de Comentarios */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span>Comentarios</span>
                                        {commentsDetails.length > 0 && (
                                            <span className="ml-2 bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                                {commentsDetails.length}
                                            </span>
                                        )}
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {commentsDetails.length > 0 ? (
                                        commentsDetails.map((comment, index) => (
                                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start">
                                                    <img
                                                        src={`/userAssets/${comment.usuario_id}/${comment.img}`}
                                                        alt={comment.nickname}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/userAssets/default/defaultImg.png';
                                                        }}
                                                    />
                                                    <div className="ml-3 flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <p className="text-base font-medium text-gray-900">{comment.nombre}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    @{comment.nickname}
                                                                    <span className="mx-1">•</span>
                                                                    <span>
                                                                        {new Date(comment.fecha).toLocaleDateString('es-ES', {
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <DeleteCommentButton 
                                                                commentId={comment.id} 
                                                                setComments={setCommentsDetails} 
                                                                comments={commentsDetails}
                                                                filteredComments={commentsDetails} // Since we're not filtering in this view, we can pass the same array
                                                                setMessage={(msg, type = 'info') => handleShowToast(msg, type)}
                                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-base text-gray-700 whitespace-pre-line leading-relaxed">{comment.contenido}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center">
                                            <p className="text-gray-500">No hay comentarios en esta publicación</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <p className="text-gray-600">No se pudo cargar la publicación</p>
                    </div>
                )}
            </div>
            {/* Toast Notification */}
            <Toast 
                message={message} 
                type={toastType} 
                onClose={handleCloseToast} 
            />
        </div>
    );
}

export default PostDetails;