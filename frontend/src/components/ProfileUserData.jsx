import React, { useEffect, useState } from 'react'
import { getDataProfile } from '../services/userService'

const ProfileUserData = () => {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState({});

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
const handleSave = (field) => {
    setEditingField((prev) => ({
      ...prev, //Para mantener los datos anteriores de los otros campos al guardar un campo concreto
      [field]: false //Campo que guardamos
    }));

    // Aquí puedes hacer una llamada a la API para guardar el nuevo valor
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