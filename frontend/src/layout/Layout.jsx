import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  // Definir si estamos en una ruta de administrador
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname === '/dashboard'
  return (
    <>
        <Header></Header>
        <main className={`min-h-screen ${isAdminRoute ? 'bg-white' : 'bg-white'}`}>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
    </>
  )
}

export default Layout