import axios from "axios";

//Ruta base
const API_URL = "http://localhost/proyecto_tfg/backend/routes/";

export const getDataProfile = async() =>{
    try {
        const response = await axios.get(`${API_URL}users.php?action=getDataProfile`, {
            //params: { userId }, // Pasamos el userId como parámetro
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

  //const formData = new FormData();
  //formData.append('tags', tags.join(',')); // Convertimos el array en string

  try {
    const response = await axios.post(`${API_URL}users.php?action=selectUserTags`, 
      {tags} , // Enviamos como JSON, tags será un array directamente
      
      {
        headers:
        {
            'Content-Type':'application/json' //Asegura que lo lea bien el backend. Correcto tipo MIME
        },
        withCredentials: true } // Muy importante si usas cookies de sesión
    );

    //console.log("Datos que se meten dentro del formData:",tags);
    /*console.log("Datos del formData");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }*/

    console.log("Datos enviados al backend:", tags);
    return response.data;

  } catch (error) {
    console.error("Error seleccionando las etiquetas:", error);
    throw error;
  }
}

//Copia de getAllUsers por si acaso se necesita donde se muestran todos los usuarios en la parte del foro
export const getAllUsersCopia = async () => {
  try {
    const response = await axios.get(`${API_URL}users.php?action=getAllUsersCopia`, {
      withCredentials: true // Importante si usas cookies para la sesión
    });

    console.log("Datos de todos:", response.data)
    return response.data.usuarios || [];

  } catch (error) {
    console.error("Error obteniendo todos los usuarios", error);
    throw error;
  }
}

export const getAllUsers = async (limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}users.php?action=getAllUsers&limit=${limit}&offset=${offset}`, {
      withCredentials: true // Importante si usas cookies para la sesión
    });

    //console.log("Datos de todos:", response.data)
    return response.data

  } catch (error) {
    console.error("Error obteniendo todos los usuarios", error);
    throw error;
  }
}


export const getUserByNickname = async (nickname) => {
  try {
    const response = await axios.get(`${API_URL}users.php?action=getUserByNickname&nickname=${nickname}`, {
      withCredentials: true,
    });
    console.log("Nickname", nickname);
    console.log("Datos del usuario clickado: ",response.data);
    return response.data;

  } catch (error) {
    console.error("Error obteniendo el usuario por nickname", error);
    throw error;
  }
}


export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}users.php?action=deleteUser&userId=${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error eliminando el usuario", error);
    throw error;
  }
}

export const updateUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}users.php?action=updateUser`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error actualizando el usuario", error);
    throw error;
  }
}

export const getExtendedDataUser = async(userId) => {
  try {
    const response = await axios.get(`${API_URL}users.php?action=getExtendedDataUser&userId=${userId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los datos extendidos del usuario", error);
    throw error;
  }
}

