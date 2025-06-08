import React, { useState } from 'react';

const UserFiltersSidebar = ({ onFiltersChange }) => {
  const [soloConTagsEnComun, setSoloConTagsEnComun] = useState(false);
  const [soloConDescripcion, setSoloConDescripcion] = useState(false);
  const [soloConPermiteContacto, setSoloConPermiteContacto] = useState(false); // 2.1 Y en el estado del componente UserFiltersSidebar, añade su estado correspondiente


  const handleCheckboxChange = (filterName) => (e) => {
  const value = e.target.checked;
  if (filterName === 'soloConTagsEnComun') setSoloConTagsEnComun(value);
  if (filterName === 'soloConDescripcion') setSoloConDescripcion(value);
  if (filterName === 'soloConPermiteContacto') setSoloConPermiteContacto(value); // 2.2 Y en el handleCheckboxChange, actualiza el estado correspondiente

  onFiltersChange((prevFilters) => ({
    ...prevFilters,
    [filterName]: value,
  }));
};

  return (
    <aside className="hidden md:block fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 max-w-full p-6 bg-white/80 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-md overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-black flex items-center gap-2">
        Filtra según lo que busques
      </h2>
      <hr className="w-3/4 mx-auto my-3 border-t-2 border-gray-200" />
      <div className="space-y-0 text-base text-gray-700">
        {/* Filtro: Solo con tags en común */}
        <label className="flex items-center gap-3 cursor-pointer group py-3">
          <span className="flex-1">Solo con <span className="">tags en común</span></span>
          <input
            type="checkbox"
            checked={soloConTagsEnComun}
            onChange={handleCheckboxChange('soloConTagsEnComun')}
            className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
          />
        </label>
        <hr className="w-3/4 mx-auto my-2 border-t-2 border-gray-200" />
        {/* Filtro: Solo con descripción */}
        <label className="flex items-center gap-3 cursor-pointer group py-3">
          <span className="flex-1">Solo con <span className="">descripción</span></span>
          <input
            type="checkbox"
            checked={soloConDescripcion}
            onChange={handleCheckboxChange('soloConDescripcion')}
            className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
          />
        </label>
        <hr className="w-3/4 mx-auto my-2 border-t-2 border-gray-200" />
        {/* Filtro: Solo permite contacto */}
        <label className="flex items-center gap-3 cursor-pointer group py-3">
          <span className="flex-1">Solo usuarios que <span className="">permiten contacto</span></span>
          <input
            type="checkbox"
            checked={soloConPermiteContacto}
            onChange={handleCheckboxChange('soloConPermiteContacto')}
            className="w-5 h-5 accent-blue-500 rounded transition-all duration-200 shadow focus:ring focus:ring-blue-200"
          />
        </label>
      </div>
    </aside>
  );
};

export default UserFiltersSidebar;