import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

export const getDataProfile = async() =>{
    try {
        const response = await axios.get(`${API_URL}users.php?action=getDataProfile`, {
            withCredentials: true // Importante si usas cookies para la sesión
          });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los datos de la sesión", error);
        throw error;
    }
}