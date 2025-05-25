import React, { useEffect, useState, useRef } from 'react'
import { getDataProfile } from '../services/userService'
import { sendUpdateData } from '../services/userService';
import { sendUpdateImg } from '../services/userService';
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

const ProfileUserData = () => {
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null); // Referencia al input de tipo file
  const [editingField, setEditingField] = useState({});
  const date = new Date();
  const limitYear = (date.getFullYear()-10)+"-12-31"; //Año actual - 10 años para el límite del campo de nacimiento
  //Toast de verificación de que se ha actualizado el campo
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // success o error

  // Contexto para manejar la sesión del usuario
  const { setUserSession } = useContext(UserContext);

// Mapeo de campos del formulario a los nombres que espera el backend
  const fieldMapping = {
  Nombre: "nombre",
  Email: "email",
  Telefono: "telefono",
  Nacimiento: "nacimiento",
  Nickname: "nickname"
};

// Mapeo de campos del contexto a los nombres que se mostrarán en el formulario
const contextFieldMapping = {
  Nombre: "nombre",
  Nickname: "usuario",
  // Si quieres guardar email o telefono en el contexto, añádelos aquí
};


// Obtener datos del perfil al cargar el componente
   useEffect(() => {
      getDataProfile()
      .then(data => {
        console.log("Datos del perfil:", data);
        setUserData(data);
      })
      .catch(error => console.error(error));
    }, [])

console.log("User data",userData);

if (!userData) return <p>Cargando datos...</p>;

  //Cuando le das a la imagen de perfil
  const handleImageClick = () => { 
    fileInputRef.current.click(); // Simula un clic en el input de tipo file
  }

  //Cuando seleccionas una nueva imagen
  const handleImgChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
      const formData = new FormData();
      formData.append("oldImg", userData.ImgPerfil); // Añadir la imagen actual al FormData
      formData.append("newImg", file); // Añadir la nueva imagen al FormData

      // Lógica para enviar la imagen al backend
      sendUpdateImg(formData)
      .then(response => {
        console.log("Imagen actualizada:", response);
        return getDataProfile();
      })
      .then((updatedData) => {
        console.log("Datos actualizados:", updatedData);
        setUserData(updatedData); // 👈 Actualizar el estado local
        setUserSession(prev => ({ ...prev, img: updatedData.ImgPerfil })); // 👈 Actualizar el global
      })
      .catch(error => {
        console.error("Error al actualizar la imagen", error);
      });
    }
  }


//Cuando le das al boton de editar
const handleEdit = (field) => {
    setEditingField((prev) => ({
      ...prev,
      [field]: true
    }));
  };

//Cuando guardas el nuevo valor
const handleSave = async (field) => {
    setEditingField((prev) => ({
      ...prev, //Para mantener los datos anteriores de los otros campos al guardar un campo concreto
      [field]: false //Campo que guardamos
    }));

    // Lógica para guardar el nuevo valor en el backend
    try {
      const formData= new FormData();
      formData.append("campo", fieldMapping[field])
      formData.append("valor", userData[field]);
      
      await sendUpdateData(formData); // usamos directamente la clave y su nuevo valor
      console.log("Actualización exitosa");
      console.log("Campo actualizado:", fieldMapping[field], " valor nuevo:", userData[field]);

      // Actualizar el contexto global del usuario
      setUserSession((prev) => ({
        ...prev,
        [contextFieldMapping[field]]: userData[field] // Actualizar el campo correspondiente en la sesión del usuario
      }));

      // Actualizar los datos del perfil después de guardar
      //getDataProfile();

      // Mostrar el toast de éxito
      setToastMessage(`Campo ${fieldMapping[field]} actualizado correctamente`);
      setToastType('success');
    } catch (error) {
      console.error("Error al actualizar el campo", error);

      // Mostrar el toast de error
      setToastMessage(`Error al actualizar el campo ${field}`);
      setToastType('error');
    } finally {
      // Volver a bloquear el input y quitar el toast después de unos segundos
      setEditingField((prev) => ({ ...prev, [field]: false }));
      setTimeout(() => {
        setToastMessage('');
        setToastType('');
      }, 3000);
    }
  }

  // Cuando editas el valor mientras escribe
  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev, // Para mantener lod datos anteriores de los otros campos al editar un campo concreto
      [field]: value // Campo que editamos
    }));
  }

  // Cuando cancelas
  const handleCancel = (field) => {
    setEditingField((prev) => ({
      ...prev, 
      [field]: false
    }));
  }
    
  return (
    <>
      {toastMessage && (
        <div className={`fixed top-5 right-5 p-4 rounded shadow-md z-50
        ${toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toastMessage}
        </div>
      )}

      {/* Imagen de perfil */}
      <div className='flex justify-center items-center h-screen'>
        <img src={`../userAssets/${userData.Nickname}/${userData.ImgPerfil}`} alt="Imagen de perfil del usuario" className=' w-[200px] h-[200px] rounded-full object-cover cursor-pointer' onClick={handleImageClick}/>
        <input type="file" accept="image/*" className='hidden' ref={fileInputRef} onChange={handleImgChange} />
      </div>

      <form action="" className='flex flex-col gap-4 w-fit'>
        <h1 className='text-3xl'>Datos de usuario</h1>
        {Object.entries(userData)
          .filter(([clave]) => clave !== 'ImgPerfil') // Filtar los campos que no quieres mostrar
          .map(([clave, valor]) => (
            <div className='flex flex-col gap-2' key={clave}>
              <label htmlFor={clave}>{clave}</label>
              <div className='flex gap-2'>
                <input
                  type={clave != "Nacimiento" ? "text" : "date"}
                  value={valor || 'Añade información para que otros usuarios puedan conocerte mejor'}
                  name={clave}
                  className='border p-2'
                  disabled={!editingField[clave]}
                  onChange={(e) => handleChange(clave, e.target.value)}
                  ref={(input) => {
                    if (editingField[clave] && input) {
                      input.focus();
                    }
                  }}
                  min={clave === "Nacimiento" ? "1927-01-01" : undefined}
                  max={clave === "Nacimiento" ? limitYear : undefined}
                ></input>
                {!editingField[clave] ? (
                  <button
                    type="button"
                    className='rounded-3xl bg-cyan-700 p-3 cursor-pointer hover:bg-blue-600'
                    onClick={() => handleEdit(clave)}
                  >
                    Editar
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className='rounded-3xl bg-green-600 p-3 cursor-pointer hover:bg-green-800'
                      onClick={() => handleSave(clave)}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className='rounded-3xl bg-red-600 p-3 cursor-pointer hover:bg-red-800'
                      onClick={() => handleCancel(clave)}
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </form>
    </>
  )
}

export default ProfileUserData