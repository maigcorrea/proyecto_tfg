import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";


export const createComment = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}comments.php?action=createComment`,
        formData,
        { withCredentials: true})

        return response.data;
    } catch (error) {
      console.error("Error creando comentario:", error);
        throw error;
    }
}

export const getCommentsByPost = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}comments.php?action=getCommentsByPost&postId=${postId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo comentarios:", error);
        throw error;
    }
}

export const getAllComments = async (limit = 10, offset = 0) => {
  try {
      const response = await axios.get(`${API_URL}comments.php?action=getAllComments&limit=${limit}&offset=${offset}`, { withCredentials: true });
      return response.data;
  } catch (error) {
      console.error("Error obteniendo todos loa comentarios:", error);
      throw error;
  }
}

export const getCommentsCountByPost = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}comments.php?action=getCommentsCountByPost&postId=${postId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo el número de comentarios:", error);
        throw error;
    }
}

export const deleteComment = async (commentId) => {
  try {
      const response = await axios.delete(`${API_URL}comments.php?action=deleteComment&commentId=${commentId}`, { withCredentials: true });
      return response.data;
  } catch (error) {
      console.error("Error eliminando comentario:", error);
      throw error;
  }
}