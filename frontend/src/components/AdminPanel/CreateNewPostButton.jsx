import React, { useState } from 'react'
import {userRegisterFromAdmin} from '../../services/authService';

const CreateNewPostButton = () => {
    const [createUser, setCreateUser] = useState(false);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [perfil, setPerfil] = useState(null);
    const [tipo, setTipo] = useState("usu"); // Valor por defecto
    const [error, setError] = useState('');
    //const navigate = useNavigate();

    const handleCloseModal = () => {
        setCreateUser(false);
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ENTRANDO AL HANDLE SUBMIT");
    if (password !== repPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("nickname", nickname);
    formData.append("telefono", telefono);
    formData.append("password", password);
    formData.append("nacimiento", nacimiento);
    formData.append("img", perfil);
    formData.append("tipo", tipo);

    try {
      const response = await userRegisterFromAdmin(formData);
      if (!response.success) {
        setError(response.message);
        return;
      } else {
        alert(response.message);
        handleCloseModal();
        setNombre("");
        setEmail("");
        setNickname("");
        setTelefono("");
        setPassword("");
        setRepPassword("");
        setNacimiento("");
        setPerfil(null);
        setTipo("usu");
      }
    } catch (err) {
      console.error("Error al crear usuario:", err);
      setError("Ocurrió un error inesperado");
    }
  };
  return (
    <>
          <div class="inline-flex items-center ml-auto space-x-2 sm:space-x-3">
              <button className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => setCreateUser(!createUser)}><svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>Añadir nuevo Post</button>

              <a href="#" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 cursor-pointer">
                  <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
                  Export
              </a>
          </div>

          {/* Modal para crear un nuevo usuario */}
          {createUser && 
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className='flex'>
                <h2 className="text-xl font-bold mb-4">Crear nuevo usuario</h2>
                <button type="button" onClick={handleCloseModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" data-modal-toggle="edit-user-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>

            <form action="" method="post" encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor='nombre'>Nombre</label>
                <input type="text" name='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} className="border p-2 w-full" placeholder="Nombre" />
              </div>

              <div className="mb-2">
                <label htmlFor='email'>Email</label>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" />
              </div>

              {/* Comprobar si el nickname ya está pillado */}
              <div className="mb-2">
                <label htmlFor="nickname">Nickname:</label>
                <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="border p-2 w-full" placeholder='Nickname'></input>
              </div>

              <div className='mb-2'>
                {/* Comprobar que el número es válido (Se le puede enviar un sms) */}
                <label htmlFor="tel">Teléfono:</label>
                <input type="number" name="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="border p-2 w-full" placeholder='xxx xxx xxx'></input>
              </div>

              <div className='mb-2'>
                {/* Controlar que el usuario sea mayor de edad */}
                <label htmlFor="nickname">Nacimiento:</label>
                <input type="date" name="nacimiento" onChange={(e) => setNacimiento(e.target.value)} className="border p-2 w-full"></input>
              </div>
              

              <div className="mb-2">
                <label htmlFor='contr'>Contraseña</label>
                <input type="password" name="contr" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" placeholder="Contraseña" />
              </div>

              <div className="mb-2">
                <label htmlFor='repContr'>Repetir contraseña</label>
                <input type="password" name="repContr" value={repPassword} onChange={(e) => setRepPassword(e.target.value)} className="border p-2 w-full" placeholder="Repetir contraseña" />
              </div>

              <div className='mb-2'>
                <label htmlFor="imgPerfil">Imagen:</label>
                <input type="file" name="img" onChange={(e) => setPerfil(e.target.files[0])}accept="image/*" className='cursor-pointer' />
              </div>

            <div className='mb-2'>
                <label htmlFor="tipo">Tipo:</label>
                <div className="flex space-x-2">
                    <label className="flex items-center space-x-2 bg-gray-200 rounded-full py-2 px-4 cursor-pointer hover:bg-gray-300">
                        <input
                            type="radio"
                            id="admin"
                            name="tipo"
                            value="admin"
                            checked={tipo === "admin"}
                            onChange={(e) => setTipo(e.target.value)}
                            className="accent-green-500" // Puedes quitar hidden y estilizar con accent-color
                        />
                        <span>Administrador</span>
                    </label>
                    <label className="flex items-center space-x-2 bg-gray-200 rounded-full py-2 px-4 cursor-pointer hover:bg-gray-300">
                        <input
                            type="radio"
                            id="usu"
                            name="tipo"
                            value="usu"
                            checked={tipo === "usu"}
                            onChange={(e) => setTipo(e.target.value)}
                            className="accent-green-500"
                        />
                        <span>Usuario</span>
                    </label>
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </div>

            
              {/* Puedes añadir más campos si quieres */}
              <div className="flex justify-end space-x-2 mt-4">
                <input
                  type="submit"
                  value={"Registrar"}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
        }
    </>
  )
}

export default CreateNewPostButton