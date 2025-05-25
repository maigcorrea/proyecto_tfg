//REPRESENTA UN POST INDIVIDUAL EN EL FORO
import React,{useEffect, useState} from 'react'
import CommentSection from './CommentSection';
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {
    const navigate = useNavigate();
    const [mostrarComentarios, setMostrarComentarios] = useState(false);

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
        <button className="hover:text-blue-500">❤️ Like</button>
        <button onClick={() => setMostrarComentarios(!mostrarComentarios)} className="hover:text-blue-500">
          💬 Comentar
        </button>
      </div>

      {mostrarComentarios && <CommentSection postId={post.id} />}
    </div>
    </>
  )
}

export default PostCard