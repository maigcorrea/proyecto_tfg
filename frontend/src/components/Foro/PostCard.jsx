//REPRESENTA UN POST INDIVIDUAL EN EL FORO
import React,{useEffect, useState} from 'react'
import CommentSection from './CommentSection';
import { useNavigate } from 'react-router-dom';
import { createLike } from '../../services/likeService';
import { removeLike } from '../../services/likeService';

const PostCard = ({post}) => {
    const navigate = useNavigate();
    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [crear, setCrear] = useState(true); // Estado para controlar la creación de likes
    const [color, setColor] = useState("text-gray-600");

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
        <button className={`cursor-pointer hover:text-blue-500 ${color}`} onClick={crear ? handleCreateLike : handleRemoveLike}>❤️ Like</button>
        <button onClick={() => setMostrarComentarios(!mostrarComentarios)} className="cursor-pointer hover:text-blue-500">
          💬 Comentar
        </button>
      </div>

      {mostrarComentarios && <CommentSection postId={post.id} />}
    </div>
    </>
  )
}

export default PostCard