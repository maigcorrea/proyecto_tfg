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
    <aside className="w-64 p-6 border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <div className="space-y-4 text-sm text-gray-700">
        <label className="flex items-center space-x-2">
          <input
                type="checkbox"
                checked={soloConTagsEnComun}
                onChange={handleCheckboxChange('soloConTagsEnComun')}
            />
          <span>Solo con tags en común</span>
        </label>

        <label className="flex items-center space-x-2">
        <input
            type="checkbox"
            checked={soloConDescripcion}
            onChange={handleCheckboxChange('soloConDescripcion')}
        />
          <span>Solo con descripción</span>
        </label>

        {/* 2. Modifica el UserFiltersSidebar.jsx para añadir el nuevo checkbox */}
        <label className="flex items-center space-x-2">
        <input
            type="checkbox"
            checked={soloConPermiteContacto}
            onChange={handleCheckboxChange('soloConPermiteContacto')}
        />
            <span>Solo usuarios que permiten contacto</span>
        </label>
      </div>
    </aside>
  );
};

export default UserFiltersSidebar;