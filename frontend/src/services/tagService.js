import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

export const getAllTags = async (limit = 10, offset = 0) => {
    try {
        const response = await axios.get(`${API_URL}tags.php?action=getAllTags&limit=${limit}&offset=${offset}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
};