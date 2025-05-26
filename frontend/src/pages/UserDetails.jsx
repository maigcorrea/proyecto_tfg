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
  const otras = user.tags?.split(',').map(t => t.trim()) || [];

  return (
    <>
    
        <h1>DETALLES DEL USUARIO</h1>
        
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <img
                src={`../../public/userAssets/${user.id}/${user.img}`}
                alt={user.nickname}
                className="w-32 h-32 rounded-full mx-auto object-cover border"
            />
            <h2 className="text-xl font-bold text-center mt-4">{user.nombre}</h2>
            <p className="text-center text-gray-600">@{user.nickname}</p>
            <p className="text-center text-sm text-gray-500">
                {user.nacimiento ? `${calcularEdad(user.nacimiento)} años (${user.nacimiento})` : 'Edad no disponible'}
            </p>
            

            <h2 className="font-bold">Sobre Mí</h2>
            <p>{user.descripcion || "No hay desripción de este usuario"}</p>

            <h2 className="font-bold">Intereses</h2>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {!user.tags && "Este usuario no ha añadido ningún interés de momento"}
                 {otras.map((tag, index) => {
            const enComun = propias.includes(tag);
            return (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm border ${
                  enComun
                    ? 'bg-green-100 text-green-800 border-green-300'  // tags en común
                    : 'bg-blue-100 text-blue-700 border-blue-300'    // tags normales
                }`}
              >
                {tag}
              </span>
            );
          })}
            </div>

           
        </div>
        
        <button
  onClick={() => navigate('/discover')}
  className="ml-4 mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
>
  ← Volver
</button>
    </>
  )
}

export default UserDetails