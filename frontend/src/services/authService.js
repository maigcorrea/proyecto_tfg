import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

//Comprobar si hay una sesión iniciada
export const checkSession = () => {
    return axios.get(`${API_URL}users.php?action=checkSessionExists`, {
      withCredentials: true // Importante si usas cookies para la sesión
    });
  };


//Función para enviar los datos del form de login al backend
export const sendLoginData = async (FormData) => {
    try {
        const response = await axios.post(`${API_URL}/users.php?action=login`,FormData,{
            headers:{
                'Content-Type':'multipart/form-data' //Asegura que lo lea bien el backend
            },
            responseType: 'json'  // Esto indica explícitamente que esperamos una respuesta JSON
        });

        if(response.data.success){
            setSessions(FormData);
        }

        return response.data;
    } catch (error) {
        console.error("Error enviando datos del formulario:", error);
        throw error; // O devuelve algo manejable según lo que necesites
    }
};


export const setSessions = async (FormData) => {
    try {
        console.log('LLEGO');
        const response = await axios.post(`${API_URL}/users.php?action=session`,FormData, {
            withCredentials: true // Importante si usas cookies para la sesión
          }, {
            headers:{
                'Content-Type':'multipart/form-data', //Asegura que lo lea bien el backend
            },
            responseType: 'json'  // Esto indica explícitamente que esperamos una respuesta JSON
        });

        return response.data;
    } catch (error) {
        console.error("Error haciendo set de las sesiones:", error);
        throw error;
    }
}

export const closeSes = async () => {
    try {
      const response = await axios.get(`${API_URL}/users.php?action=close`, {
        withCredentials: true
      });
  
      return response.data;
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      throw error;
    }
  }