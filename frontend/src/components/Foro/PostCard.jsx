//REPRESENTA UN POST INDIVIDUAL EN EL FORO
import React,{useContext, useEffect, useState, useRef} from 'react'
import CommentSection from './CommentSection';
import { useNavigate } from 'react-router-dom';
import { createLike } from '../../services/likeService';
import { removeLike } from '../../services/likeService';
import { hasUserLikedPost } from '../../services/likeService';
import { getLikesCountByPost } from '../../services/likeService';
import { PostContext } from '../../../context/PostContext';
import { getCommentsCountByPost } from '../../services/commentService';

const PostCard = ({post}) => {
    const navigate = useNavigate();
    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [crear, setCrear] = useState(!post.userLiked); // Estado para controlar la creación de likes
    const [color, setColor] = useState(post.userLiked ? "text-blue-500" : "text-gray-600");
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const [commentsCount, setCommentsCount] = useState( post.commentsCount || 0); //Faltaría recuperar el número inicial de comentarios del post del contexto 
    const [likeAnimation, setLikeAnimation] = useState(''); // 'pop' o 'unpop'


    //AQUÍ
    /*const { setPosts } = useContext(PostContext); // <- Obtenemos setPosts del contexto

    // Usamos el estado inicial del post (no necesitamos setCrear, setColor ni likesCount locales)
    const [localState, setLocalState] = useState({
      liked: post.userLiked,
      likes: post.likesCount || 0,
    });*/

    useEffect(() => {
      const checkLikes = async () => {
    try {
      const response = await hasUserLikedPost(post.id);
      if(response.success){
        setCrear(false);
        setColor("text-blue-500");
      }
    } catch (error) {
      console.error("Error verificando like:", error);
    }
  };


  const getLikesCount = async () => {
    try {
      const response = await getLikesCountByPost(post.id);
      if(response.success){
        setLikesCount(response.likesCount);
      }
    } catch (error) {
      console.error("Error obteniendo el número de likes:", error);
    }
  }

  const getCommentsCount = async () => {
    try {
      const response = await getCommentsCountByPost(post.id);
      if(response.success){
        setCommentsCount(response.commentsCount);
      }
    } catch (error) {
      console.error("Error obteniendo el número de comentarios:", error);
    }
  }

  checkLikes();
  getLikesCount();
  getCommentsCount();
    }, [post.id])

  const tiempoDesde = (fecha) => {
    const diff = Date.now() - new Date(fecha).getTime();
    const minutos = Math.floor(diff / 60000);
    if (minutos < 60) return `${minutos} min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas} h`;
    const dias = Math.floor(horas / 24);
    return `${dias} d`;
  };

  const handleNavigate = () => {
    navigate(`../userDetail/${post.nickname}`);
  }


  const handleCreateLike = async () => {
    setLikeAnimation('pop');
    const formData = new FormData();
    formData.append('postId', post.id);

    try {
      const response = await createLike(formData);
      if(response.success){
        console.log("Like creado:", response);
        setCrear(false) // Cambiamos a false para evitar crear más likes
        setColor("text-blue-500"); 
        setLikesCount(prev => prev + 1); // Incrementa el contador al instante

        //AQUI
        //setLocalState({ liked: true, likes: localState.likes + 1 });
        //  Actualizamos el contexto PostContext
          /*setPosts(prev =>
            prev.map(p => p.id === post.id ? { ...p, userLiked: true, likesCount: p.likesCount + 1 } : p)
          );*/
      }else{
        console.log("Error al crear el like");
      }
    } catch (error) {
      console.error("Error creando like:", error);
    }
  }

  const handleRemoveLike = async () => {
    setLikeAnimation('unpop');
    const formData = new FormData();
    formData.append('postId', post.id);

    try {
      const response = await removeLike(formData);
      if(response.success){
        console.log("Like eliminado:", response);
        setCrear(true);
        setColor("text-gray-600");
        setLikesCount(prev => Math.max(prev - 1, 0)); // Decrementa el contador, sin permitir negativos

        //AQUÍ
        /*setLocalState({ liked: false, likes: Math.max(localState.likes - 1, 0) });
        setPosts(prev =>
          prev.map(p => p.id === post.id ? { ...p, userLiked: false, likesCount: Math.max(p.likesCount - 1, 0) } : p)
        );*/
      }else{
        console.log("Error al eliminar el like");
      }
    } catch (error) {
      console.error("Error eliminando like:", error);
    }
  }

  
  return (
    <>
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-100 transition-shadow hover:shadow-2xl group">
          {/* Header usuario */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={`/userAssets/${post.user_id}/${post.img}`}
                alt={post.nickname}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 leading-tight text-base">{post.nombre}
                <span className="ml-2 text-gray-400 text-sm font-normal">@{post.nickname}</span>
              </span>
              <span className="text-xs text-gray-400 mt-1">{tiempoDesde(post.fecha)}</span>
            </div>
          </div>

          {/* Contenido */}
          <div className="mb-4 px-1">
            <p className="text-gray-900 text-[1.05rem] leading-relaxed break-words whitespace-pre-line">{post.contenido}</p>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-8 mt-2 px-1">
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 ${color} hover:bg-blue-50`}
              onClick={crear ? handleCreateLike : handleRemoveLike}
            >
              <span
                className={`text-lg transition-all duration-300 ease-in-out transform 
                  ${likeAnimation === 'pop' && !crear ? 'animate-like-pop' : ''}
                  ${likeAnimation === 'unpop' && crear ? 'animate-like-unpop' : ''}
                `}
                style={{ display: 'inline-block', cursor: 'pointer' }}
                key={crear ? 'unliked' : 'liked'}
                onAnimationEnd={() => setLikeAnimation('')}
              >
                {crear ? '🤍' : '❤️'}
              </span>
              <span className='text-black cursor-pointer'>Like</span>
              {likesCount !== 0 && <span className="ml-1 text-gray-500 font-semibold">{likesCount}</span>}
            </button>
            <button
              onClick={() => setMostrarComentarios(!mostrarComentarios)}
              className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              
              <span className='text-black cursor-pointer'>Comentar</span>
              {commentsCount !== 0 && <span className="ml-1 text-gray-500 font-semibold">{commentsCount}</span>}
            </button>
          </div>

          {/* Sección de comentarios con animación simple Tailwind */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden
              ${mostrarComentarios ? 'max-h-[1000px] opacity-100 mt-4 border-t pt-4 border-gray-100' : 'max-h-0 opacity-0'}
            `}
            style={{ willChange: 'max-height, opacity' }}
          >
            {mostrarComentarios && (
              <CommentSection postId={post.id} setCommentsCount={setCommentsCount} />
            )}
          </div>
        </div>
    </>
  )
}

export default PostCard