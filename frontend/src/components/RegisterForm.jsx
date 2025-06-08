import React, { useEffect, useState } from 'react'
import css from './FormLogin.module.css';
import { sendRegisterData } from '../services/authService';
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const navigate=useNavigate();
    
    //Importar dinámicamente el link de icons de Google
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=visibility,visibility_off';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    
        // Limpieza si el componente se desmonta
        return () => {
          document.head.removeChild(link);
        };
      }, []);

      //Enviar datos del formulario a PHP con formData

      //Definir los datos que se van a enviar
      const [nombre, setNombre] = useState("");
      const [email, setEmail] = useState("");
      const [nickname, setNickname] = useState("");
      const [telefono, setTelefono] = useState("");
      const [password, setPassword] = useState("");
      const [repPass, setRepPass] = useState("");
      const [nac, setNac] = useState("");
      const [perfil, setPerfil] = useState(null);
      const [permiso, setPermiso] = useState("");
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      const date = new Date();
      const limitYear = (date.getFullYear()-18)+"-12-31";

      const handleSubmit = async (e) => {
        e.preventDefault();

        //Validación del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        /* This code checks if the input email matches a basic email format using a regular expression (emailRegex). If the email is invalid, it sets an error message ('Email no valido') and stops the function execution. */
        if (!emailRegex.test(email)) {
            setError('Email no valido');
            return;
        }

        //Comprobación de que las contraseñas coinciden
        if (password !== repPass) {
            setError('Las contraseñas no coinciden');
            return;
        }

        //Validación del campo teléfono
        if (telefono.length < 9 || telefono.length > 9) {
            setError('El tеléfono debe tener 9 dígitos');
            return;
        }

        // Crear el objeto FormData para enviar el archivo junto a otros campos
        const formData=new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("nickname", nickname);
        formData.append("telefono", telefono);
        formData.append("password", password);
        formData.append("nacimiento", nac);
        formData.append("img", perfil);
        formData.append("permiso", permiso);

        try{
            const response= await sendRegisterData(formData);

            //Trabajar la respuesta
            console.log('Respuesta del backend:', response);
            console.log('Datos de la respuesta:', response.success, " ",response.message);

            if(!response.success){
                setError(response.message);
                return;
            }else{
                alert(response.message);
                navigate("/tags");
                window.location.reload();
            }

        }catch(error){
            console.error('Error en el registro:', error);
        }
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b0d5d3] to-slate-300 py-8 px-2">
      <div className="w-full max-w-7xl flex rounded-3xl shadow-2xl overflow-hidden bg-white mt-16">
        {/* Panel Izquierdo: Formulario */}
        <div className="w-full md:w-1/2 bg-white px-8 py-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Registro</h2>
          <p className="text-gray-500 text-center mb-6">Crea tu cuenta</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-3">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
              <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input type="number" name="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label htmlFor="nacimiento" className="block text-sm font-medium text-gray-700">Nacimiento</label>
              <input type="date" name="nacimiento" value={nac} onChange={(e) => setNac(e.target.value)} min="1927-01-01" max={limitYear} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label htmlFor="contr" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" name="contr" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Indica tu contraseña" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label htmlFor="repContr" className="block text-sm font-medium text-gray-700">Repetir contraseña</label>
              <input type="password" name="repContr" value={repPass} onChange={(e) => setRepPass(e.target.value)} placeholder="Repite tu contraseña" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label htmlFor="imgPerfil" className="block text-sm font-medium text-gray-700">Imagen</label>
              <input type="file" name="img" onChange={(e) => setPerfil(e.target.files[0])} accept="image/*" className="mt-1 block w-full cursor-pointer text-sm" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="permiso" checked={permiso} onChange={(e) => setPermiso(e.target.checked)} className="cursor-pointer accent-black" />
              <span className="text-xs text-gray-600">Doy permiso para que otros usuarios me contacten a través de correo electrónico</span>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
            <button type="submit" className="w-full py-2 mt-2 bg-[#b0d5d3] hover:bg-[#92b1af] text-black font-semibold rounded-lg shadow transition">Enviar</button>
          </form>
        </div>
        {/* Panel Derecho: Mensaje de bienvenida */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#b0d5d3] to-purple-500 text-black px-10 py-12 relative">
          <h2 className="text-3xl font-bold mb-2 text-center">Hola, ya tienes cuenta?</h2>
          <p className="mb-6 text-center text-lg">Identificate para tener acceso a todo el contenido</p>
          <button onClick={() => navigate('/login')} className="px-8 py-2 border-2 border-black rounded-lg text-black font-semibold hover:bg-black hover:text-white transition">INICIAR SESIÓN</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm