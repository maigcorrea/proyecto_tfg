//REPRESENTA UN POST INDIVIDUAL EN EL FORO
import React,{useContext, useEffect, useState} from 'react'
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
        <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex items-center space-x-3 mb-2 cursor-pointer" onClick={handleNavigate}>
        <img
          src={`/userAssets/${post.nickname}/${post.img}`}
          alt={post.nickname}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{post.nombre} <span className="text-gray-500 text-sm">@{post.nickname}</span></p>
          <p className="text-xs text-gray-400">{tiempoDesde(post.fecha)}</p>
        </div>
      </div>

      <p className="mb-2 text-gray-800">{post.contenido}</p>

      <div className="flex space-x-6 text-sm text-gray-600">
        {/*<button className={`cursor-pointer hover:text-blue-500 ${localState.liked  ? "text-blue-500" : "text-gray-600"}`} onClick={!localState.liked ? handleCreateLike : handleRemoveLike}>{!localState.liked ? "🤍 Like" : "❤️ Like"} {localState.likes !=0 && localState.likes}</button>*/}
        <button className={`cursor-pointer hover:text-blue-500 ${color}`} onClick={crear ? handleCreateLike : handleRemoveLike}>{crear ? "🤍 Like" : "❤️ Like"} {likesCount !=0 && likesCount}</button>
        <button onClick={() => setMostrarComentarios(!mostrarComentarios)} className="cursor-pointer hover:text-blue-500">
          💬 Comentar {commentsCount !=0 && commentsCount}
        </button>
      </div>

      {mostrarComentarios && <CommentSection postId={post.id} setCommentsCount={setCommentsCount} />}
    </div>
    </>
  )
}

export default PostCard