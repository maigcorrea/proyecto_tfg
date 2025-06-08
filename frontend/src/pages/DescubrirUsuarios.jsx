import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllUsersCopia } from '../services/userService';
import UserCard from '../components/UserCard';
import UserFiltersSidebar from '../components/UserFiltersSideBar';
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

import MobileFiltersModal from '../components/MobileFiltersModal';





const DescubrirUsuarios = () => {
    
    const [usuarios, setUsuarios] = useState([]);
    const { userSession } = useContext(UserContext);
    // Estado para mostrar el modal de filtros en móvil
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    //Usuarios visibles al cargar la app (Va de 10 en 10)
    const [visibleCount, setVisibleCount] = useState(() => {
      return parseInt(localStorage.getItem('visibleCount')) || 10;
    });

  //Filtros
  const [filters, setFilters] = useState({
    soloConTagsEnComun: false,
    soloConDescripcion: false,
    soloConPermiteContacto: false, // 1. Actualiza el estado filters para incluir el nuevo filtro
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

  // 3. Aplica el filtro en usuariosFiltrados
  if (filters.soloConPermiteContacto && user.permiso !== 1) {
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
      {/* Botón para abrir filtros en móvil */}
      <button
        className="fixed top-20 left-6 z-50 md:hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all"
        onClick={() => setShowFiltersModal(true)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
        Filtros
      </button>

      {/* Modal de filtros en móvil */}
      <MobileFiltersModal open={showFiltersModal} onClose={() => setShowFiltersModal(false)}>
        {/* Sidebar pero sin clases fixed ni hidden */}
        <div className="w-full p-2">
          <h2 className="text-2xl font-bold mb-4 text-black flex items-center gap-2">
            Filtra según lo que busques
          </h2>
          <hr className="w-3/4 mx-auto my-3 border-t-2 border-gray-200" />
          <div className="space-y-0 text-base text-gray-700">
            {/* Filtro: Solo con tags en común */}
            <label className="flex items-center gap-3 cursor-pointer group py-3">
              <span className="flex-1">Solo con <span className="font-semibold">tags en común</span></span>
              <input
                type="checkbox"
                checked={filters.soloConTagsEnComun}
                onChange={e => setFilters(f => ({ ...f, soloConTagsEnComun: e.target.checked }))}
                className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
              />
            </label>
            <hr className="w-3/4 mx-auto my-2 border-t-2 border-gray-200" />
            {/* Filtro: Solo con descripción */}
            <label className="flex items-center gap-3 cursor-pointer group py-3">
              <span className="flex-1">Solo con <span className="font-semibold">descripción</span></span>
              <input
                type="checkbox"
                checked={filters.soloConDescripcion}
                onChange={e => setFilters(f => ({ ...f, soloConDescripcion: e.target.checked }))}
                className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
              />
            </label>
            <hr className="w-3/4 mx-auto my-2 border-t-2 border-gray-200" />
            {/* Filtro: Solo permite contacto */}
            <label className="flex items-center gap-3 cursor-pointer group py-3">
              <span className="flex-1">Solo usuarios que <span className="font-semibold">permiten contacto</span></span>
              <input
                type="checkbox"
                checked={filters.soloConPermiteContacto}
                onChange={e => setFilters(f => ({ ...f, soloConPermiteContacto: e.target.checked }))}
                className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
              />
            </label>
          </div>
        </div>
      </MobileFiltersModal>

      <div className="flex min-h-screen bg-gray-50">
        {/* 🧩 Filtros (lado izquierdo) */}
        <UserFiltersSidebar onFiltersChange={setFilters} />

        {/* 👤 Usuarios (lado derecho) */}
        <main className="flex-1 p-6 md:ml-72 mt-16">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {usuariosFiltrados.slice(0, visibleCount).map(user => (
              <UserCard key={user.telefono} user={user} />
            ))}
          </div>

          {visibleCount < usuariosFiltrados.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleVerMas}
                className="px-6 py-2 bg-[#a1c7c0] text-black rounded hover:bg-[#a1c7c0]/80 transition cursor-pointer"
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