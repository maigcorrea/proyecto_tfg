import React, { useEffect, useState, useRef } from 'react'
import { getDataProfile } from '../services/userService'
import { sendUpdateData } from '../services/userService';
import { sendUpdateImg } from '../services/userService';
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';
import ProfileUserDataExtended from './ProfileUserDataExtended';
import { useNavigate } from 'react-router-dom';
import { updatePermission } from '../services/userService';
import { verifyPassword } from '../services/authService';
import { changePassword } from '../services/authService';
import PostMadeByUser from './AdminPanel/PostMadeByUser';
import { getExtendedDataUser } from '../services/userService';
import LikedPostByUser from './AdminPanel/LikedPostByUser';
import CommentedPostByUser from './AdminPanel/CommentedPostByUser';
import CommentsMadeByUser from './AdminPanel/CommentsMadeByUser';

const ProfileUserData = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null); // Referencia al input de tipo file
  const [editingField, setEditingField] = useState({});
  const date = new Date();
  const limitYear = (date.getFullYear()-10)+"-12-31"; //Año actual - 10 años para el límite del campo de nacimiento

  //Modificar contraseña
  const [modifyPassword, setModifyPassword] = useState(false);
  const [step, setStep] = useState(1); //1 verificación, 2 cambiar contraseña
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //Toast de verificación de que se ha actualizado el campo
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // success o error

  // Contexto para manejar la sesión del usuario
  const { userSession, setUserSession } = useContext(UserContext);

  //Información más extensa del usuario
  const [comments, setComments] = useState([]);
  const [postCommented, setPostCommented] = useState([]);
  const [postLiked, setPostLiked] = useState([]);
  const [postCreated, setPostCreated] = useState([])

// Mapeo de campos del formulario a los nombres que espera el backend
  const fieldMapping = {
  Nombre: "nombre",
  Email: "email",
  Telefono: "telefono",
  Nacimiento: "nacimiento",
  Nickname: "nickname",
  Descripcion: "descripcion",
  Permiso: "permiso",
};

// Mapeo de campos del contexto a los nombres que se mostrarán en el formulario
const contextFieldMapping = {
  Nombre: "nombre",
  Nickname: "usuario",
  Permiso: "permiso",
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


//Obtener datos del perfil más extensa al cargar el componente
     useEffect(() => {
          const getUserDetails = async () => {
            try {
              const response = await getExtendedDataUser(userSession.id);
              console.log("RESPONSEEEEEEEEEEE",response);
              setPostCommented(response.commented_posts);
              setComments(response.user_comments);
              setPostLiked(response.liked_posts);
              setPostCreated(response.created_posts);
              
            } catch (error) {
              console.log("Error obteniendo los detalles del usuario", error);
            }
          }
    
          getUserDetails();
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


  //Al cambiar el checkbox de permiso
  const handlePermissionChange = async(checkValue) => {
    try {
      const response = await updatePermission(checkValue);
      console.log(response);

      if(response.success) {
        //Actualizar contexto del usuario con el nuevo permiso
        setUserSession(prev => ({ ...prev, permiso: checkValue })); 
      }
    } catch (error) {
      console.error("Error actualizando el permiso del usuario", error);
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
    
  console.log("QUE HAY AQUÍ JODER",userSession);


  //Para modificar la contraseña
  const handleVerify = async() => {

  try {
    const response = await verifyPassword(currentPassword);
    console.log(response);

    if(response.success){
      setStep(2);
      setError('');
    }else{
      setError('Contraseña incorrecta');
    }
  } catch (error) {
    console.error("Error verificando la contraseña", error);
  }
};

const handlePasswordChange = async() => {
  if (newPassword !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }else if(confirmPassword.trim().length === 0){
    setError('Las contraseñas no pueden estar vacias');
    return;
  }

  try {
    const response = await changePassword(newPassword);
    console.log(response);
    if(response.success){
      setSuccessMessage('Contraseña cambiada exitosamente');
      // Limpiar el formulario
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      //Cerrar el modal
      setModifyPassword(false);
      //Volver al paso 1
      setStep(1);
    }else{
      setError(response.message);
    }
  } catch (error) {
    console.error("Error cambiando la contraseña", error);
  }
};

  return (
    <>
      {toastMessage && (
        <div className={`fixed top-5 right-5 p-4 rounded shadow-md z-50
        ${toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toastMessage}
        </div>
      )}

<div className='flex mt-16 flex-col items-start lg:flex-row w-full min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100'>


      {/* Contenedor principal */}
      <div className="w-full lg:w-1/2 flex flex-col items-center ml-4 justify-center py-8 px-2 bg-gradient-to-br from-blue-50 to-cyan-100">
        {/* Tarjeta perfil */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl flex flex-col items-center gap-8 border-t-8 border-cyan-400">

          {/* Imagen de perfil */}
          <div className="relative group mb-2">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 blur opacity-60 group-hover:opacity-90 transition-all"></div>
            <img
              src={userData.ImgPerfil ? `/userAssets/${userSession.id}/${userData.ImgPerfil}` : `/userAssets/default/defaultImg.png`}
              alt="Imagen de perfil del usuario"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg z-10 relative cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={handleImageClick}
            />
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImgChange} />
           
          </div>

          {/* Datos de usuario */}
          <form action="" className="flex flex-col gap-6 w-full">
            <h1 className="text-2xl font-bold text-cyan-700 mb-2 text-center">Datos de usuario</h1>

            {Object.entries(userData)
              .filter(([clave]) => clave !== 'ImgPerfil' && clave !== 'Tags' && clave !== 'Permiso' && clave !== 'Tipo')
              .map(([clave, valor]) => (
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-cyan-50 p-3 rounded-xl shadow-sm" key={clave}>
                  <label htmlFor={clave} className="w-20 font-medium text-gray-600 text-sm md:text-base">
                    {clave === "Descripcion" ? "Sobre mí:" : `${clave}:`}
                  </label>
                  <div className="flex-1 flex gap-2 items-center">
                    <input
                      type={clave !== "Nacimiento" ? "text" : "date"}
                      value={valor || ''}
                      name={clave}
                      className="border-b-4 border-black rounded-lg p-2 w-full focus:outline-none text-gray-700 bg-white transition-all disabled:bg-gray-100 disabled:text-gray-400"
                      disabled={!editingField[clave]}
                      onChange={(e) => handleChange(clave, e.target.value)}
                      ref={(input) => {
                        if (editingField[clave] && input) {
                          input.focus();
                        }
                      }}
                      min={clave === "Nacimiento" ? "1927-01-01" : undefined}
                      max={clave === "Nacimiento" ? limitYear : undefined}
                    />
                    {!editingField[clave] ? (
                      <button
                        type="button"
                        className="rounded-full cursor-pointer bg-cyan-600 text-white px-4 py-2 text-xs md:text-sm font-semibold shadow hover:bg-cyan-700 transition-all flex items-center gap-1"
                        onClick={() => handleEdit(clave)}
                      >
                         Editar
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="rounded-full cursor-pointer bg-green-500 text-white px-4 py-2 text-xs md:text-sm font-semibold shadow hover:bg-green-600 transition-all flex items-center gap-1"
                          onClick={() => handleSave(clave)}
                        >
                           Guardar
                        </button>
                        <button
                          type="button"
                          className="rounded-full cursor-pointer bg-red-500 text-white px-4 py-2 text-xs md:text-sm font-semibold shadow hover:bg-red-600 transition-all flex items-center gap-1"
                          onClick={() => handleCancel(clave)}
                        >
                           Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

            {/* Tags */}
            <div className="flex flex-col gap-2 bg-cyan-50 p-3 rounded-xl shadow-sm">
              <label htmlFor="Tags" className="font-medium text-gray-600 text-sm md:text-base">Tags</label>
              <div className="flex flex-wrap gap-2 items-center">
                {userData.Tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-cyan-300 text-cyan-900 text-xs font-semibold shadow-sm">
                    {tag}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => navigate(`/edit-tags/${userSession.id}`)}
                  className="rounded-full cursor-pointer bg-cyan-600 text-white px-4 py-1 text-xs font-semibold shadow hover:bg-cyan-700 transition-all ml-2"
                >
                  Editar
                </button>
              </div>
            </div>


            {/* Permiso */}
          <div className="flex items-center gap-2 w-full justify-end">
            <input
              id="permiso-contacto"
              type="checkbox"
              checked={userSession.permiso === 1 || userSession.permiso === "1"}
              onChange={(e) => handlePermissionChange(e.target.checked ? 1 : 0)}
              className="accent-cyan-500 w-5 h-5"
            />
            <label htmlFor="permiso-contacto" className="text-gray-700 text-sm">Permitir que me contacten por email</label>
          </div>
          </form>

          {/* Botón cambiar contraseña */}
          <div className="w-full flex justify-end mt-2">
            <button
              onClick={() => setModifyPassword(true)}
              className="rounded-full cursor-pointer bg-yellow-400 text-yellow-900 px-6 py-2 font-semibold shadow hover:bg-yellow-500 transition-all flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
<path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
</svg> Cambiar contraseña
            </button>
          </div>
        </div>
      </div>


    <div className="w-full lg:w-1/2 xl:w-[70%] mx-auto px-2 mt-10 lg:mt-0 flex flex-col">
      {/* Tabs */}
      <div className="w-full">
        <div className="flex flex-wrap border-b border-gray-200 mb-4 overflow-x-auto">
          {['Creados', 'Me gusta', 'Comentados', 'Comentarios'].map((tab, idx) => (
            <button
              key={tab}
              className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none whitespace-nowrap ${selectedTab === idx ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'}`}
              onClick={() => setSelectedTab(idx)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-2">
          {selectedTab === 0 && (
            <div className=''>
              <PostMadeByUser postCreated={postCreated} idUsuario={userSession.id} setPostCreated={setPostCreated}/>
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <LikedPostByUser postLiked={postLiked}/>
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <CommentedPostByUser postCommented={postCommented}/>
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <CommentsMadeByUser comments={comments} idUsuario={userSession.id} setComments={setComments}/>
            </div>
          )}
        </div>
      </div>
    </div>

</div>
      


{/* Modal con steps */}
{modifyPassword && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-96 relative">
      <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>

      {/* Steps */}
      {step === 1 && (
        <>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Contraseña actual:
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button onClick={() => setModifyPassword(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
              Cancelar
            </button>
            <button onClick={handleVerify} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Verificar
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            Nueva contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar nueva contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button onClick={() => setModifyPassword(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
              Cancelar
            </button>
            <button onClick={handlePasswordChange} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Guardar contraseña
            </button>
          </div>
          {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
        </>
      )}

    </div>
  </div>
)}


    </>
  )
}

export default ProfileUserData