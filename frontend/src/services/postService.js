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
        console.error("Error creating post:", error);
        throw error;
    }
}