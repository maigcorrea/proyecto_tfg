import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileButtons from './ProfileButtons';
import { FaUsers, FaHome, FaComment, FaQuestion, FaCog, FaLock, FaSignOutAlt, FaBlogger, FaTags } from 'react-icons/fa';

const menuItems = [
  { label: 'Dashboard', icon: <FaHome />, to: '/dashboard' },
  { label: 'Usuarios', icon: <FaUsers />, to: '/admin/users' },
  { label: 'Publicaciones', icon: <FaBlogger />, to: '/admin/posts' },
  { label: 'Comentarios', icon: <FaComment />, to: '/admin/comments' },
  { label: 'Etiquetas', icon: <FaTags />, to: '/admin/tags' }
  
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;


  return (
     <>
      {/* Botón hamburguesa */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#4c7389]  z-40 transition-all duration-300 flex flex-col ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            null
          ) : (
            <span className="text-xl font-bold mb-6"> </span> // compacto
          )}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 mb-6"
            >
              
            </button>
          )}
        </div>

        <nav className="flex-1 flex flex-col space-y-1 pl-2 mt-2">
          {menuItems.map((item, idx) => {
            const active = isActive(item.to);
            return (
              <Link
                key={idx}
                to={item.to}
                className={`relative flex items-center gap-4 transition-all duration-300 ease-in-out
                  ${isOpen ? 'px-4 py-2' : 'p-3 justify-center'}
                  ${active ? 'text-black bg-white' : 'text-gray-800 hover:bg-gray-200'}
                  ${isOpen && active ? 'rounded-l-full' : 'rounded-l-full'}
                `}
              >
                <div className="text-xl">{item.icon}</div>
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}

          <div className="mt-4 px-2">
            <ProfileButtons />
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {/*isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )*/}
      
    </>
  );
};

export default AdminSidebar;