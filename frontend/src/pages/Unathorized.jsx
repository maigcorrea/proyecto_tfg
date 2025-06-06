import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño retraso para la animación de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Estilo para el gradiente radial que sigue al ratón
  const gradientStyle = {
    background: `radial-gradient(
      circle at ${mousePos.x}px ${mousePos.y}px,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.8) 40%,
      rgba(0, 0, 0, 0.95) 70%,
      rgba(0, 0, 0, 1) 100%
    )`,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease-out'
  };

  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative transition-all duration-1000"
      onMouseMove={handleMouseMove}
    >
      {/* Capa de gradiente que sigue al ratón */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={gradientStyle}
      />
      
      {/* Contenido principal */}
      <div 
        className={`relative z-10 text-center max-w-2xl mx-auto p-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 
          className="text-8xl md:text-[12rem] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            letterSpacing: '-0.05em',
            lineHeight: '0.9'
          }}
        >
          401
        </h1>
        
        <h2 
          className="text-2xl md:text-4xl font-medium mb-8 text-gray-300"
          style={{
            textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
          }}
        >
          Acceso no autorizado
        </h2>
        
        <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto">
          No tienes permiso para acceder a esta página.
        </p>
        
        <button
          onClick={handleGoHome}
          className="relative px-8 py-3 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden group border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
            Volver al inicio
          </span>
          <span 
            className="absolute inset-0 bg-white/0 group-hover:bg-white transition-all duration-500"
            style={{
              clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
              transition: 'clip-path 0.5s ease-in-out'
            }}
          />
        </button>
      </div>
      
      <div className="absolute bottom-8 text-center z-10">
        <p className="text-gray-500 text-sm">
          ¿Necesitas ayuda?{' '}
          <a 
            href="mailto:soporte@ejemplo.com" 
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            Contáctanos
          </a>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;