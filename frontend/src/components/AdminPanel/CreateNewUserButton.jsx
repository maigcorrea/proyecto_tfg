import React, { useState } from 'react'
import {userRegisterFromAdmin} from '../../services/authService';

const CreateNewUserButton = ({ setMessage }) => {
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
    const date = new Date();
    const limitYear = (date.getFullYear()-18)+"-12-31";
    //const navigate = useNavigate();

    const handleCloseModal = () => {
        setCreateUser(false);
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ENTRANDO AL HANDLE SUBMIT");

    //Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* This code checks if the input email matches a basic email format using a regular expression (emailRegex). If the email is invalid, it sets an error message ('Email no valido') and stops the function execution. */
    if (!emailRegex.test(email)) {
        setError('Email no valido');
        return;
    }

    //Validación del campo teléfono
    if (telefono.length < 9 || telefono.length > 9) {
        setError('El tеléfono debe tener 9 dígitos');
        return;
    }

    //Validación de que las contraseñas coinciden
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
        setMessage(`Error: ${response.message}`);
        return;
      } else {
        setMessage(response.message);
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
      const errorMsg = err.response?.data?.message || "Ocurrió un error inesperado";
      setError(errorMsg);
      setMessage(`Error: ${errorMsg}`);
    }
  };
  return (
    <>
          <div class="inline-flex items-center ml-auto space-x-2 sm:space-x-3">
              <button className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => setCreateUser(!createUser)}><svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>Añadir nuevo usuario</button>
          </div>

          {/* Modal para crear un nuevo usuario */}
          {/* Modal para crear un nuevo usuario */}
{createUser && 
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Crear nuevo usuario</h2>
        <button
          type="button"
          onClick={handleCloseModal}
          className="text-gray-500 hover:text-gray-800"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 
              8.586l4.293-4.293a1 1 0 
              111.414 1.414L11.414 10l4.293 
              4.293a1 1 0 01-1.414 
              1.414L10 11.414l-4.293 
              4.293a1 1 0 
              01-1.414-1.414L8.586 10 4.293 
              5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {[
          { label: 'Nombre', type: 'text', value: nombre, onChange: setNombre, name: 'nombre' },
          { label: 'Email', type: 'email', value: email, onChange: setEmail, name: 'email' },
          { label: 'Nickname', type: 'text', value: nickname, onChange: setNickname, name: 'nickname' },
          { label: 'Teléfono', type: 'number', value: telefono, onChange: setTelefono, name: 'tel' },
          { label: 'Nacimiento', type: 'date', value: nacimiento, onChange: setNacimiento, name: 'nacimiento', extraProps: { min: "1927-01-01", max: limitYear } },
          { label: 'Contraseña', type: 'password', value: password, onChange: setPassword, name: 'contr' },
          { label: 'Repetir contraseña', type: 'password', value: repPassword, onChange: setRepPassword, name: 'repContr' },
        ].map(({ label, type, value, onChange, name, extraProps = {} }) => (
          <div key={name} className="mb-3">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-800"
              {...extraProps}
            />
          </div>
        ))}

        <div className="mb-3">
          <label htmlFor="imgPerfil" className="block text-sm font-medium text-gray-700 mb-1">Imagen:</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={(e) => setPerfil(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo:</label>
          <div className="flex gap-4">
            {['admin', 'usu'].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-full hover:bg-gray-300 cursor-pointer"
              >
                <input
                  type="radio"
                  name="tipo"
                  value={option}
                  checked={tipo === option}
                  onChange={(e) => setTipo(e.target.value)}
                  className="accent-green-500"
                />
                <span className="capitalize">{option === 'usu' ? 'Usuario' : 'Administrador'}</span>
              </label>
            ))}
          </div>
          {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  </div>
}
    </>
  )
}

export default CreateNewUserButton