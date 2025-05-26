import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

export const createLike = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}likes.php?action=createLike`,
            formData,
            { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error("Error creando like:", error);
        throw error;
    }
}


export const removeLike = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}likes.php?action=removeLike`,
            formData,
            { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error("Error eliminando like:", error);
        throw error;
    }
}