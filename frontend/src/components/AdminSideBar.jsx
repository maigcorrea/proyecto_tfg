import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileButtons from './ProfileButtons';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de hamburguesa para abrir el sidebar */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Icono de tres rayas */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Admin Panel</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              ✕
            </button>
          </div>
          <nav className="mt-8 flex flex-col space-y-4">
            <Link to="/dashboard" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Dashboard
            </Link>
            <Link to="/admin/users" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Usuarios
            </Link>
            <Link to="/admin/posts" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Publicaciones
            </Link>
            <Link to="/admin/comments" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Comentarios
            </Link>
            <Link to="/admin/tags" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Etiquetas
            </Link>
            <Link to="/my-profile" className="text-gray-700 hover:bg-yellow-400 px-4 py-2 rounded">
             Perfil
            </Link>
            
            <ProfileButtons></ProfileButtons>
          </nav>
        </div>
      </div>

      {/* Sombra de fondo al abrir */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;