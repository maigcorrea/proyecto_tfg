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

export const sendUpdateImg = async (data) => {
  try {
    const response = await axios.post(`${API_URL}users.php?action=updateImg`, 
      data, 
      { withCredentials: true } // Muy importante si usas cookies de sesión
    );
    console.log(data); // Para debug para ver qué se está enviando
    return response.data;
  } catch (error) {
    console.error("Error actualizando la imagen:", error);
    throw error;
  }
}



export const sendUpdateData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}users.php?action=updateProfile`, 
      data, 
      { withCredentials: true } // Muy importante si usas cookies de sesión
    );
    console.log(data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando los datos:", error);
    throw error;
  }
}



export const selectUserTags = async (tags) => {
  try {
      console.log(tags);
     const formData = new FormData();
      formData.append('tags', tags.join(',')); // Aquí conviertes el array a string y lo añadimos al formData

    const response = await axios.post(
      `${API_URL}users.php?action=updateProfile`,
      formData,
      {  
         withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar tags:', error);
    return null;
  }
}