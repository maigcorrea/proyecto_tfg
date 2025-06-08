import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserrContext';
import { sendLoginData, setSessions } from '../services/authService';
import css from './FormLogin.module.css';

const FormLogin = () => {
  const { setUserSession } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Estados
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar iconos de Material Symbols
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_name=visibility,visibility_off';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);
    formDataToSend.append('password', formData.password);

    try {
      const response = await sendLoginData(formDataToSend);
      
      if (response.success) {
        const sessionsResponse = await setSessions(formDataToSend);
        
        if (sessionsResponse.success) {
          setUserSession({
            id: sessionsResponse.id,
            usuario: sessionsResponse.usu,
            tipo: sessionsResponse.tipo,
            permiso: sessionsResponse.permiso
          });

          // Redirigir según el tipo de usuario
          if (sessionsResponse.tipo === "usu") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
          
          // Recargar la página después de 100ms para asegurar la navegación
          setTimeout(() => window.location.reload(), 100);
        } else {
          setError(sessionsResponse.message || 'Error al iniciar sesión');
        }
      } else {
        setError(response.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b0d5d3] to-slate-300 py-8 px-2 ">
      <div className="w-full max-w-7xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Panel Izquierdo: Formulario */}
        <div className="w-full md:w-1/2 bg-white px-8 py-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Iniciar sesión</h2>
          <p className="text-gray-500 text-center mb-6">Accede con tus credenciales</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="text-red-500 text-xs mt-1 text-center">{error}</div>
            )}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Usuario o correo electrónico</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b0d5d3]"
                placeholder="Ingresa tu usuario o email"
                required
              />
            </div>
            <div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b0d5d3] pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#b0d5d3] focus:outline-none"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-[#b0d5d3] hover:bg-[#92b1af] text-black font-semibold rounded-lg shadow transition"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            
          </form>
        </div>
        {/* Panel Derecho: Mensaje de bienvenida */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#b0d5d3] to-[#92b1af] text-black px-10 py-12 relative">
          <h2 className="text-3xl font-bold mb-2">¿Nuevo por aquí?</h2>
          <p className="mb-6 text-center text-lg">Regístrate para acceder a todas las funcionalidades</p>
          <button onClick={() => navigate('/register')} className="px-8 py-2 border-2 border-black rounded-lg text-black font-semibold hover:bg-black hover:text-white transition">REGÍSTRATE</button>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;