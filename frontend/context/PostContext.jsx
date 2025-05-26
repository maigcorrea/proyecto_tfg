import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { getAllPosts, createPost } from '../src/services/postService';
import { useContext } from 'react';
import { UserContext } from './UserrContext';

export const PostContext = createContext();

export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([]);
    const { userSession } = useContext(UserContext);
  
    // Obtener todos los post de la bd al cargar la app o el componente
    useEffect(() => {
        const cargarPosts = async () => {
          try {
            const response = await getAllPosts(); //Obtener todos los post (integrar el número total de likes y comentarios de la publicación y si el usuario le ha dado like)
            if (response.success) {
              setPosts(response.posts);
              console.log("usuario usado:", response.userId);
            } else {
              console.error("Error al cargar publicaciones:", response);
            }
          } catch (error) {
            console.error("Error en la carga inicial:", error);
          }
        };
    
        if (userSession.loggedIn) { // Solo cargar posts si hay sesión
            cargarPosts();
        }
      }, [userSession]);


    // Crear un nuevo post y añadirlo al principio
    const addPost = async (contenido) => {
        const formData= new FormData();
        formData.append("contenido", contenido);
    
        try {
          const nuevoPost= await createPost(formData); // Crear post en el backend, devuelve si ha habido éxito o no y datos (contenido, fecha y nickname del usuario que ha hecho el post). Los demás datos necesarios se obtienen del contexto del usuario.
          console.log("Post que me devuelve el backend: ",nuevoPost);
    
          /*const nuevoPostCompleto={
            ...nuevoPost, //El que viene del backend(success, fecha, contenido)
            nickname: userSession.usuario, // Usar el nickname del usuario
            nombre: userSession.nombre,
            img: userSession.img,
            likesCount: 0, // Nuevo post empieza con 0 likes
            userLiked: false, // Aún no le ha dado like
          }
    
          console.log("Nuevo post completo, con el backend y la info del contexto del usuario: ", nuevoPostCompleto);
    
          setPosts(prev => [nuevoPostCompleto, ...prev]);*/

          // En vez de simular localmente, recarga desde backend:
          const response = await getAllPosts();
          if (response.success) {
            setPosts(response.posts);
            console.log("Posts actualizados tras crear nuevo:", response.posts);
          } else {
            console.error("Error recargando posts tras crear nuevo:", response);
          }
          
        } catch (error) {
          console.error("Error creando post desde PostContext:", error);
        }
    };
  return (
    <>
        <PostContext.Provider value={{ posts, addPost, setPosts }}>
            {children}
        </PostContext.Provider>
    </>
  )
}
