import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

export const checkSession = () => {
    return axios.get(`${API_URL}users.php?action=checkSessionExists`, {
      withCredentials: true // Importante si usas cookies para la sesión
    });
  };