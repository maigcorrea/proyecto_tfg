import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllUsersCopia } from '../services/userService';
import UserCard from '../components/UserCard';
import UserFiltersSidebar from '../components/UserFiltersSideBar';
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

const DescubrirUsuarios = () => {
    
    const [usuarios, setUsuarios] = useState([]);
    const { userSession } = useContext(UserContext);
    

    //Usuarios visibles al cargar la app (Va de 10 en 10)
    const [visibleCount, setVisibleCount] = useState(() => {
      return parseInt(localStorage.getItem('visibleCount')) || 10;
    });

  //Filtros
  const [filters, setFilters] = useState({
    soloConTagsEnComun: false,
    soloConDescripcion: false,
  });

    useEffect(() => {
        getAllUsersCopia().then(setUsuarios);

        return () => {
    localStorage.removeItem('visibleCount');
  };
    }, []);

    const handleVerMas = () => {
  setVisibleCount(prev => {
    const nuevo = prev + 10;
    localStorage.setItem('visibleCount', nuevo);
    return nuevo;
  });

};

//Filtrar
const usuariosFiltrados = usuarios.filter((user) => { // Filtramos los usuarios
  console.log("Evaluando usuario:", user.nickname, user.tags, user.descripcion);

  // Si el filtro de tags en común está activado
  if (filters.soloConTagsEnComun) {
    const misTags = userSession?.tags || [];
    const susTags = typeof user.tags === 'string'
  ? user.tags.split(',').map(t => t.trim()) // Convierte user.tags en array ya que desde la bd viene como string
  : Array.isArray(user.tags)
    ? user.tags
    : [];
    console.log("Tags de", user.nickname, ":", user.tags)
    const hayCoincidencia = susTags.some(tag => misTags.includes(tag)); // Comprueba si hay al menos una coincidencia entre las tags del usuario logueado y las del usuario listado
    console.log("Coincidencia de tags:", hayCoincidencia);
    if (!hayCoincidencia) return false;// Si no hay coincidencia, excluye a ese usuario del filter
  }

  // Si el filtro de descripción está activado, descarta a los usuarios sin descripción (vacía o nula)
  if (filters.soloConDescripcion && (!user.descripcion || user.descripcion.trim() === '')) {
    return false;
  }

  return true; //En cualquier otro caso, mete al usuario en el filter
});


//Ver los filtros recibidos
useEffect(() => {
  console.log("Filtros aplicados:", filters);
}, [filters]);

  return (
    <>
    <h1>DESCUBIR USUARIOS</h1>
        <div className="flex min-h-screen bg-gray-50">
      {/* 🧩 Filtros (lado izquierdo) */}
      <UserFiltersSidebar onFiltersChange={setFilters} />

      {/* 👤 Usuarios (lado derecho) */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Descubre usuarios</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {usuariosFiltrados.slice(0, visibleCount).map(user => (
            <UserCard key={user.telefono} user={user} />
          ))}
        </div>

        {visibleCount < usuariosFiltrados.length && (
  <div className="text-center mt-6">
    <button
      onClick={handleVerMas}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Ver más
    </button>
  </div>
)}
      </main>
    </div>
    </>
  )
}

export default DescubrirUsuarios