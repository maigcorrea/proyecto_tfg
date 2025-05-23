import React, {useState, useContext, useEffect} from 'react'
import CreatePost from '../components/Foro/CreatePost';
import PostCard from '../components/Foro/PostCard';
import { createPost, getAllPosts } from '../services/postService';
import { UserContext } from '../../context/UserrContext';

const Foro = () => {
  // Contexto del usuario donde están los datos
  const { userSession } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  // Ontener todos los post de la bd al cargar el componente
  useEffect(() => {
    const cargarPosts = async () => {
      try {
        const response = await getAllPosts();
        if (response.success) {
          setPosts(response.posts);
        } else {
          console.error("Error al cargar publicaciones:", response);
        }
      } catch (error) {
        console.error("Error en la carga inicial:", error);
      }
    };

    cargarPosts();
  }, []);

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