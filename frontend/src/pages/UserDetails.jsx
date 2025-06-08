import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByNickname } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserrContext';

const UserDetails = () => {
    const navigate = useNavigate();
    const { userSession } =useContext(UserContext);
    const { nickname } = useParams();
  const [user, setUser] = useState(null);

  //Tendría que pasarle el nickname desde donde se muestran los post hasta aquí al redirigir a esta página (al darle click al usuario del post)
  useEffect(() => {
    getUserByNickname(nickname)
      .then(data => setUser(data))
      .catch(err => console.error('Error al cargar usuario:', err));
  }, [nickname]);

  console.log("USUARIOOOOOOOOOOO",user);
  //Calcular edad del usuario
  const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return null;

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
};

  if (!user) return <p className="text-center mt-10">Cargando información del usuario...</p>;


  // Comparar tags
  const propias = userSession?.tags || [];
  const otras = user.tagsUser?.map(t => t.trim()) || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 mt-16 ">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12 flex flex-col items-center relative">
          <div className="relative mb-6">
            <img
              src={`../../public/userAssets/${user.id}/${user.img}`}
              alt={user.nickname}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto object-cover shadow-lg border-4 border-white"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">{user.nombre}</h2>
          <p className="text-center text-blue-700 text-lg font-semibold mb-1">@{user.nickname}</p>
          <p className="text-center text-gray-500 text-base mb-4">
            {user.nacimiento ? `${calcularEdad(user.nacimiento)} años (${user.nacimiento})` : 'Edad no disponible'}
          </p>

          {/* Sección Sobre mí */}
          <div className="w-full bg-gray-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-lg text-gray-700 mb-2 flex items-center gap-2">
              Sobre mí
            </h3>
            <p className="text-gray-700 text-base">
              {user.descripcion || <span className="italic text-gray-400">No hay descripción de este usuario</span>}
            </p>
          </div>

          {/* Sección Intereses */}
          <div className="w-full mb-6">
            <h3 className="font-bold text-lg text-gray-700 mb-2 flex items-center pl-5 gap-2">
  
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {!user.tagsUser && <span className="text-gray-400 italic">Este usuario no ha añadido ningún interés de momento</span>}
              {otras.map((tag, index) => {
                const enComun = propias.includes(tag);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm border font-medium shadow-sm transition-colors duration-200
                      ${enComun
                        ? 'bg-green-100 text-green-800 border-green-300 '
                        : 'bg-blue-100 text-blue-700 border-blue-300'}
                    `}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            
          </div>

          {/* Botón de contacto si permite */}
          {user.permiso === 1 && user.email && (
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 w-full"
            >
              <button
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none animate-pulse hover:animate-none"
              >
                Contactar
              </button>
            </a>
          )}
        </div>
        <button
          onClick={() => navigate('/discover')}
          className="absolute top-20 right-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition shadow"
        >
          <span className="hidden sm:inline">← Volver</span>
          <span className="sm:hidden">←</span>
        </button>

        
      </div>
    </>
  )
}

export default UserDetails