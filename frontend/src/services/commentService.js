import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";


export const createComment = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}comment.php?action=createComment`,
        formData,
        { withCredentials: true})

        return response.data;
    } catch (error) {
      console.error("Error creando comentario:", error);
        throw error;
    }
}