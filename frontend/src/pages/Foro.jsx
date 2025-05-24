import React, {useState, useContext, useEffect} from 'react'
import CreatePost from '../components/Foro/CreatePost';
import PostCard from '../components/Foro/PostCard';
import { PostContext } from '../../context/PostContext';

const Foro = () => {

  //AHORA ESTO SE HACE DESDE EL CONTEXTO DE POSTS
  // Contexto del usuario donde están los datos
  //const { userSession } = useContext(UserContext);
  //const [posts, setPosts] = useState([]);


  // Obtener todos los post de la bd al cargar el componente
  /*useEffect(() => {
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


  // Crear un nuevo post y añadirlo al principio
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
    
  };*/

  const { posts, addPost } = useContext(PostContext);

  
  const handleCreate = async (contenido) => {
    await addPost(contenido);
  };

  // APUNTE PARA EL FUTURO: Se puede simplificar más aún moviendo la llamada a addPost directamente a CreatePost.jsx, haciendo que el propio componente gestione la creación del post desde el contexto. Así no se necesita pasarle onCreate desde Foro.jsx. Sin embargo, de cara a que en el  futuro exista la posibilidad de que CreatePost.jsx sea un componente reutilizable al que se le pase otra función como prop(desde otra página o componente por ejemplo), he decidido dejarlo así por ahora. Si en el futuro veo que no se reutiliza, lo simplificaré si lo veo oportuno.

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