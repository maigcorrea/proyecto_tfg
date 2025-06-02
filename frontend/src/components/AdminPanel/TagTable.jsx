import React, { useEffect, useState } from 'react'
import { getAllTags } from '../../services/tagService';
import { deleteTag } from '../../services/tagService';

const TagTable = () => {
    const [tags, setTags] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación
    const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para eliminación
    const [message, setMessage] = useState("");
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
        } catch (error) {
            console.log("Error obteniendo todas las tags", error);
        }
      }

      getTags();
    }, [currentPage]);

    //Paginación
    const totalPages = Math.ceil(totalTags / limit);

    const handleDelete = async(tagId) => {
        try {
            setIsDeleting(true); // Inicia el spinner
            console.log("SE DEBERÍA BORRAR LA TAG", tagId);
            const response = await deleteTag(tagId);
            setMessage(response.message);
            if(response.success){
                setTags(tags.filter(tag => tag.id !== tagId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
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
        <h2>Todas las tags</h2>
        <table className='w-full text-center'>
        <thead>
          <th>Nombre</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          tags && tags.map((tag) => (
            <tr>
              <td>{tag.nombre}</td>
              <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(tag.id)}}>Eliminar</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>


      {/* Paginación */}
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Siguiente
      </button>
    </div>

 <p>{message}</p>

    {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>¿Estás seguro de que quieres eliminar esta etiqueta?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : "Sí, eliminar"}
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setConfirmDeleteId(null)} disabled={isDeleting}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TagTable