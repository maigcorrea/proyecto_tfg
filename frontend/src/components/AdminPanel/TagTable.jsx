import React, { useEffect, useState } from 'react'
import { getAllTags } from '../../services/tagService';

const TagTable = () => {
    const [tags, setTags] = useState([]);
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
              <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(user.id)}}>Eliminar</button></td>
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
    </>
  )
}

export default TagTable