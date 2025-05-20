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

  const formData = new FormData();
  formData.append('tags', tags.join(',')); // Convertimos el array en string

  try {
    const response = await axios.post(`${API_URL}users.php?action=selectUserTags`, 
      formData , 
      
      {
        headers:
        {
            'Content-Type':'multipart/form-data' //Asegura que lo lea bien el backend
        },
        withCredentials: true } // Muy importante si usas cookies de sesión
    );

    console.log("Datos que se meten dentro del formData:",tags);
    console.log("Datos del formData");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    return response.data;

  } catch (error) {
    console.error("Error seleccionando las etiquetas:", error);
    throw error;
  }
}



export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}users.php?action=getAllUsers`, {
      withCredentials: true // Importante si usas cookies para la sesión
    });

    console.log("Datos de todos:", response.data)
    return response.data.usuarios || [];

  } catch (error) {
    console.error("Error obteniendo todos los usuarios", error);
    throw error;
  }
}


