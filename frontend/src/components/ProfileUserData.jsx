import React, { useEffect, useState } from 'react'
import { getDataProfile } from '../services/userService'
import { sendUpdateData } from '../services/userService';

const ProfileUserData = () => {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState({});
  const date = new Date();
  const limitYear = (date.getFullYear()-10)+"-12-31"; //Año actual - 10 años para el límite del campo de nacimiento
  //Toast de verificación de que se ha actualizado el campo
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // success o error

  const fieldMapping = {
  Nombre: "nombre",
  Email: "email",
  Telefono: "telefono",
  Nacimiento: "nacimiento",
  Nickname: "nickname"
};


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
      await sendUpdateData(fieldMapping[field], userData[field]); // usamos directamente la clave y su nuevo valor
      console.log("Actualización exitosa");
      console.log("Campo actualizado:", fieldMapping[field], " valor nuevo:", userData[field]);
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

      <form action="" className='flex flex-col gap-4 w-fit'>
        <h1 className='text-3xl'>Datos de usuario</h1>
        {Object.entries(userData)
          .filter(([clave]) => clave !== 'Perfil')
          .map(([clave, valor]) => (
            <div className='flex flex-col gap-2' key={clave}>
              <label htmlFor={clave}>{clave}</label>
              <div className='flex gap-2'>
                <input
                  type={clave != "Nacimiento" ? "text" : "date"}
                  value={valor}
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