import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllUsers } from '../services/userService';
import UserCard from '../components/UserCard';

const DescubrirUsuarios = () => {
    
    const [usuarios, setUsuarios] = useState([]);

    //Usuarios visibles al cargar la app (Va de 10 en 10)
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        getAllUsers().then(setUsuarios);
    }, []);

  return (
    <>
    <h1>DESCUBIR USUARIOS</h1>
        <div className="flex min-h-screen bg-gray-50">
      {/* 🧩 Filtros (lado izquierdo) */}
      <aside className="w-64 p-6 border-r border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <p className="text-sm text-gray-500">Aquí irán filtros como país, idioma, tags en común, etc.</p>
      </aside>

      {/* 👤 Usuarios (lado derecho) */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Descubre usuarios</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {usuarios.slice(0, visibleCount).map(user => (
            <UserCard key={user.telefono} user={user} />
          ))}
        </div>

        {visibleCount < usuarios.length && (
  <div className="text-center mt-6">
    <button
      onClick={() => setVisibleCount(prev => prev + 10)}
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