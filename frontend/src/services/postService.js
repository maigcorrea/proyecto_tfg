import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";


//Obtener todas las publicaciones
/*const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}posts.php?action=getAllPosts`, post, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}*/

export const createPost = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}posts.php?action=createPost`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creando post:", error);
        throw error;
    }
}

//Obtener todas las publicaciones desde la parte del usuario y si ha dado like para cada publicación
export const getAllPosts = async() => {
  try{
    const response = await axios.get(`${API_URL}posts.php?action=getAllPosts`, { withCreadentials: true});
    console.log("Todos los posts", response.data);
    return response.data;
  }catch(error){
    console.error("Error obteniendo todos los post:", error);
    throw error;
  }
}

// Obtener todas las publicaciones desde la parte del administrador (con número total de likes y comentarios)
export const getAllTotalPosts = async(limit = 10, offset = 0, selectedUserId = null) => {

  try{
    const params = new URLSearchParams({ limit, offset });
    if (selectedUserId !== null) {
      params.append("selectedUserId", selectedUserId);
    }

    const response = await axios.get(`${API_URL}posts.php?action=getAllTotalPosts&${params.toString()}`, { withCredentials: true});
    
    return response.data;
  }catch(error){
    console.error("Error obteniendo todos los post:", error);
    throw error;
  }
}

export const getPostData = async(postId) => {
  try{
    const response = await axios.get(`${API_URL}posts.php?action=getPostData&postId=${postId}`, { withCreadentials: true});
    return response.data;
  }catch(error){
    console.error("Error obteniendo los datos del post:", error);
    throw error;
  }
}

export const deletePost = async(postId) => {
  try{
    const response = await axios.delete(`${API_URL}posts.php?action=deletePost&postId=${postId}`, { withCreadentials: true});
    return response.data;
  }catch(error){
    console.error("Error eliminando el post:", error);
    throw error;
  }
}