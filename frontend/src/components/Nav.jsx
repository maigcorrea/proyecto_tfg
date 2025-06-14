import React from 'react'
import { Link } from 'react-router-dom'
import ProfileButtons from './ProfileButtons'
import { useContext } from 'react'
import { UserContext } from '../../context/UserrContext'
import AdminSidebar from './AdminSideBar'

import { useState } from 'react';

const Nav = () => {
  const { userSession } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburger = () => setMenuOpen((prev) => !prev);

  // Cierra el menú al navegar (opcional, UX)
  const handleNavLinkClick = () => setMenuOpen(false);

  return (
    <>
      {userSession.tipo === "admin" ? (
        null
      ) : (
        <nav class="bg-white/50 dark:bg-gray-900 fixed w-full  top-0 start-0 border-b border-gray-200 dark:border-gray-600 z-50 backdrop-blur-md bg-opacity-50 h-20">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-0">
            <Link to="/"><img src="/externalResources/logo.png" alt="" className='w-20 h-20'/></Link>

            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-end">
              {/* <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
              <ProfileButtons></ProfileButtons>
              <button
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400"
                aria-controls="navbar-sticky"
                aria-expanded={menuOpen}
                onClick={handleHamburger}
              >
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="none" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>

            {/* Menú de navegación */}
            <div
              class={`items-center justify-between w-full md:flex md:w-auto z-[100] md:order-1 ${menuOpen ? '' : 'hidden'} md:block`}
              id="navbar-sticky"
            >
              <ul class="flex flex-col p-4 md:p-0 mt-4 z-[100] font-medium border rounded-xl  bg-white/80 lg:bg-transparent backdrop-blur-md cursor-pointer md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 sm:border-0">
                <li className='hover:bg-[#a1c7c0] transition-colors duration-300 rounded-xl p-[10px]'> 
                  <Link to="/" onClick={handleNavLinkClick}>Inicio</Link>
                </li>
                <li className='hover:bg-[#a1c7c0] transition-colors duration-300 rounded-xl p-[10px]'>
                  <Link to='/discover' onClick={handleNavLinkClick}>Descubrir</Link>
                </li>
                <li className='hover:bg-[#a1c7c0] transition-colors duration-300 rounded-xl p-[10px]'>
                  <Link to='/foro' onClick={handleNavLinkClick}>Foro</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Nav