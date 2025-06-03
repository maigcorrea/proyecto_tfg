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

const ProfileUserData = () => {
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
  // Aquí deberías llamar a un servicio para verificar la contraseña actual
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
    
  }
};

const handlePasswordChange = () => {
  if (newPassword !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }
  // Aquí puedes llamar al servicio de cambio de contraseña
  setSuccessMessage('Contraseña cambiada exitosamente');
  setModifyPassword(false);
};

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
        <img src={`/userAssets/${userSession.id}/${userData.ImgPerfil}`} alt="Imagen de perfil del usuario" className=' w-[200px] h-[200px] rounded-full object-cover cursor-pointer hover:brightness-75 transition-all duration-600' onClick={handleImageClick}/>
        <input type="file" accept="image/*" className='hidden' ref={fileInputRef} onChange={handleImgChange} />
      </div>

      {/* Permiso */}
      <div>
          <input
            type="checkbox"
            checked={userSession.permiso === 1 || userSession.permiso === "1"}
            onChange={(e) => handlePermissionChange(e.target.checked ? 1 : 0)}
          /> Doy permiso para que me contacten por email
        </div>


      {/* Datos de usuario */}
      <form action="" className='flex flex-col gap-4 w-fit'>
        <h1 className='text-3xl'>Datos de usuario</h1>
                
        {Object.entries(userData)
          .filter(([clave]) => clave !== 'ImgPerfil' && clave !== 'Tags' && clave !== 'Permiso' ) // Filtar los campos que no quieres mostrar
          .map(([clave, valor]) => (
            <div className='flex flex-col gap-2' key={clave}>
              <label htmlFor={clave}>{clave === "Descripción" ? "Sobre mí:" : `${clave}:`}</label>
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

          <div>
            <label htmlFor="Tags">Tags</label>
            <div className='flex gap-2'>
              {userData.Tags.map((tag, index) => (
                <div key={index} className='flex gap-2 rounded-3xl bg-cyan-300 p-3'>
                  <p>{tag}</p>
                </div>
              ))}
              <button onClick={() => navigate(`/edit-tags/${userSession.id}`)} className='rounded-3xl bg-cyan-700 p-3 cursor-pointer hover:bg-blue-600'>Editar</button>
            </div>
          </div>
      </form>

      {/* Botón para abrir el modal de cambiar contraseña */}
      <div>
        <button onClick={() => setModifyPassword(true)} className="rounded-3xl bg-yellow-500 p-3 cursor-pointer hover:bg-yellow-600">
          Cambiar contraseña
        </button>
      </div>


{/* Modal con steps */}
{modifyPassword && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
        </>
      )}

      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
    </div>
  </div>
)}



      <ProfileUserDataExtended></ProfileUserDataExtended>
    </>
  )
}

export default ProfileUserData