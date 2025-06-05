import React from 'react';
import AdminSidebar from '../components/AdminSideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
        
      {/* Sidebar a la izquierda */}
      <AdminSidebar />

      {/* Contenido principal a la derecha */}
      <main className="flex-1 p-4 bg-white overflow-hidden ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;