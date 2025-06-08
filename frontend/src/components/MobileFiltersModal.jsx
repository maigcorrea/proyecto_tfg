import React, { useEffect, useState } from 'react';

const MobileFiltersModal = ({ open, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAnim, setShowAnim] = useState(false);

  // Bloquea scroll vertical del body cuando el modal está visible
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Limpieza extra por si acaso
    return () => document.body.classList.remove('overflow-hidden');
  }, [isVisible]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      // Espera al siguiente tick para activar la animación de entrada
      setTimeout(() => setShowAnim(true), 10);
    } else if (isVisible) {
      // Animación de salida
      setShowAnim(false);
      const timeout = setTimeout(() => setIsVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isVisible) return null;

  // Cerrar modal al pulsar fondo oscuro
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-400 ease-in-out ${showAnim ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative transform transition-all duration-400 ease-in-out
        ${showAnim ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default MobileFiltersModal;
