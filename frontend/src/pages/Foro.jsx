import React, {useState, useContext} from 'react'
import CreatePost from '../components/Foro/CreatePost';
import PostCard from '../components/Foro/PostCard';
import { createPost } from '../services/postService';
import { UserContext } from '../../context/UserrContext';

const Foro = () => {
  // Contexto del usuario donde están los datos
  const { userSession } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  const handleCreate = async (contenido) => {
    const formData= new FormData();
    formData.append("contenido", contenido);

    try {
      const nuevoPost= await createPost(formData); // Crear post en el backend, devuelve si ha habido éxito o no y datos (contenido, fecha y nickname del usuario que ha hecho el post). Los demás datos necesarios se obtienen del contexto del usuario.
      console.log("Post que me devuelve el backend: ",nuevoPost);

      const nuevoPostCompleto={
        ...nuevoPost, //El que viene del backend(success, fecha, contenido, nickname)
        nombre: userSession.nombre,
        img: userSession.img,
      }

      console.log("Nuevo post completo, con el backend y la info del contexto: ", nuevoPostCompleto);

      setPosts(prev => [nuevoPostCompleto, ...prev]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
    
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 px-4">
      <CreatePost onCreate={handleCreate} />
      {posts.length===0 && <p>No hay publicaciones todavía</p>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    </>
  )
}

export default Foro