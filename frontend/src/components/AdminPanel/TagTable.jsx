import React, { useEffect, useState } from 'react'
import { getAllTags } from '../../services/tagService';
import { deleteTag } from '../../services/tagService';

const TagTable = () => {
    const [tags, setTags] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación
    const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para eliminación
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);
    //Paginación
    const limit = 10;
    const [totalTags, setTotalTags] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      const getTags = async () => {
        const offset = (currentPage - 1) * limit;
        try {
            const response = await getAllTags(limit, offset);
            console.log("TODAS LAS TAGS",response);
            setTags(response.tags);
            setTotalTags(response.total);
            setFilteredTags(response.tags); // Inicialmente muestra todos
        } catch (error) {
            console.log("Error obteniendo todas las tags", error);
        }
      }

      getTags();
    }, [currentPage]);

    //Paginación
    const totalPages = Math.ceil(totalTags / limit);

    //Filtrado por nombre
     useEffect(() => {
        // Filtro local por nombre
        const filtered = tags.filter(tag => tag.nombre.toLowerCase().includes(search.toLowerCase()));
        setFilteredTags(filtered);
    }, [search, tags]);

    const handleDelete = async(tagId) => {
        try {
            setIsDeleting(true); // Inicia el spinner
            console.log("SE DEBERÍA BORRAR LA TAG", tagId);
            const response = await deleteTag(tagId);
            setMessage(response.message);
            if(response.success){
                setTags(tags.filter(tag => tag.id !== tagId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
                setFilteredTags(filteredTags.filter(tag => tag.id !== tagId)); // También actualiza filtrados
            }

        } catch (error) {
            console.log(error);
        }finally {
            setIsDeleting(false); // Finaliza el spinner
            setConfirmDeleteId(null); // Cierra el modal después de eliminar
        }
    }
    
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="text-gray-400 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4c7389] focus:border-[#4c7389] sm:text-sm"
          />
        </div>

        {/* Tabla responsive */}
        <div className="overflow-x-auto">
          <div className="min-w-full divide-y divide-gray-200">
            {/* Encabezados - visible en desktop */}
            <div className="hidden md:grid md:grid-cols-6 bg-gray-50 rounded-t-lg">
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-5">Nombre</div>
              <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1">Acciones</div>
            </div>

            {/* Cuerpo de la tabla */}
            <div className="bg-white divide-y divide-gray-200">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <div key={tag.id} className="flex flex-col md:grid md:grid-cols-6 hover:bg-gray-50 transition-colors border-b md:border-0">
                    {/* Nombre */}
                    <div className="px-4 py-2 md:py-3 md:col-span-5 flex md:block sm:justify-center">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Nombre:</span>
                      <span className="text-sm font-medium text-gray-900 w-28">{tag.nombre}</span>
                    </div>
                    {/* Acciones */}
                    <div className="px-4 py-2 md:py-3 md:col-span-1 flex items-center sm:justify-center md:justify-start">
                      <span className="block font-semibold text-xs text-gray-500 md:hidden w-28">Acciones:</span>
                      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-28' onClick={() => setConfirmDeleteId(tag.id)}>Eliminar</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No se encontraron etiquetas
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{(currentPage - 1) * limit + 1}</span> a <span className="font-medium">{Math.min(currentPage * limit, totalTags)}</span> de <span className="font-medium">{totalTags}</span> etiquetas
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
            >
              Anterior
            </button>
            <button
              disabled={currentPage === Math.ceil(totalTags / limit)}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(totalTags / limit) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
            >
              Siguiente
            </button>
          </div>
        </div>

        <p>{message}</p>

        {/* Modal de confirmación */}
        {confirmDeleteId !== null && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm border border-gray-200 text-center">
      <p className="text-gray-800 text-lg font-medium mb-6">¿Estás seguro de que quieres eliminar esta etiqueta?</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleDelete(confirmDeleteId)}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
        >
          {isDeleting ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            "Sí, eliminar"
          )}
        </button>

        <button
          onClick={() => setConfirmDeleteId(null)}
          disabled={isDeleting}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </>
  )
}

export default TagTable