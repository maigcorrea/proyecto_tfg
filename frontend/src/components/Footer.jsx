import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f100f] rounded-t-[70px] text-white font-sans">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-10 relative">
        {/* Glow verde */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-16 w-72 h-40 bg-[#a1c7c0] opacity-30 blur-3xl rounded-full pointer-events-none z-0"></div>

        {/* Newsletter */}
        <div className="z-10 flex-1 min-w-[270px] md:pr-10">
          <div className="mb-3 text-2xl md:text-2xl font-medium leading-tight">Suscríbete a nuestra newsletter y no te pierdas nada!</div>
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <input type="text" id="email" name="email" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-[#a1c7c0] focus:outline-none focus:ring focus:ring-[#a1c7c0] focus:ring-opacity-40" placeholder="Email Address" />
            <button className="px-6 py-2.5 text-sm font-medium tracking-wider text-white bg-[#232323] rounded-lg hover:bg-[#a1c7c0] hover:text-[#171717] transition-colors duration-300">Subscribe</button>
          </div>
        </div>

        {/* Quick Links + Industries */}
        <div className="z-10 flex-1 min-w-[270px] flex flex-col md:flex-row gap-8 items-start justify-end">
          {/* Quick Links */}
          <div>
            <p className="font-semibold text-[#f8fcf7] mb-3">SOBRE NOSOTROS</p>
            <div className="flex flex-col items-start space-y-2">
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">Compromiso social</a>
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">Contacto</a>
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">FAQ</a>
            </div>
          </div>
          {/* Industries */}
          <div>
            <p className="font-semibold text-[#f8fcf7] mb-3">Industries</p>
            <div className="flex flex-col items-start space-y-2">
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">Descubrir</a>
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">Foro</a>
              <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0] transition">Compromiso social</a>
            </div>
          </div>
        </div>
      </div>
      {/* Barra inferior */}
      <div className="bg-[#161616] border-t border-[#232323] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          {/* Redes sociales */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="text-[#d7d7d7]">SIGUENOS EN LAS REDES</span>
            <a href="#" className="flex items-center gap-1 text-[#a1c7c0]"><span className="inline-block">↗</span> FACEBOOK</a>
            <a href="#" className="flex items-center gap-1 text-[#a1c7c0]"><span className="inline-block">↗</span> INSTAGRAM</a>
            <a href="#" className="flex items-center gap-1 text-[#a1c7c0]"><span className="inline-block">↗</span> LINKEDIN</a>
            <a href="#" className="flex items-center gap-1 text-[#a1c7c0]"><span className="inline-block">↗</span> X</a>
          </div>
          {/* Legales y copyright */}
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <a href="#" className="text-[#d7d7d7] hover:text-[#a1c7c0]">POLÍTICA DE PRIVACIDAD</a>
            <span className="text-[#d7d7d7]">SingularLink 2025 ©</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;