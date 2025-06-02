import React, { useEffect, useState } from 'react'
import { getAllComments } from '../../services/commentService';
import DeleteCommentButton from './DeleteCommentButton';

const CommentTable = () => {
    const [comments, setComments] = useState([]);
    //Paginación
    const [totalComments, setTotalComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    //Búsqueda
      const [search, setSearch] = useState('');
      const [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
      const getComments = async () => {
        const offset = (currentPage - 1) * limit;
        console.log("OFFSET",offset);
        console.log("LIMIT",limit);
          try {
            const response = await getAllComments(limit, offset);
            console.log("COMENTARIOS",response);
            setComments(response.comments);
            setFilteredComments(response.comments);
            setTotalComments(response.total);
          } catch (error) {
            console.error('Error al obtener los comentarios:', error);
          }
      }

      getComments();
    }, [currentPage]);

    //Paginación
    const totalPages = Math.ceil(totalComments / limit);

    //Filtrado por contenido
      useEffect(() => {
        // Filtro local por contenido
        const filtered = comments.filter(comment => comment.contenido.toLowerCase().includes(search.toLowerCase()));
        setFilteredComments(filtered);
      }, [search, comments]);
    
  return (
    <>
        <input 
          type="text" 
          placeholder="Buscar comentario..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="border p-2 my-2 w-full" 
        />

        <table className='text-center w-full'>
        <thead>
          <th>Usuario</th>
          <th>Post</th>
          <th>Contenido</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          comments && filteredComments.map((comment) => (
            <tr>
              <td><a href="" className='hover:text-blue-500'>{comment.usuario_nombre}</a></td>
              <td>{comment.post_contenido}</td>
              <td>{comment.contenido}</td>
              <td>{comment.fecha.split(' ')[0]}</td>
              <td>{comment.fecha.split(' ')[1]}</td>
              <td><DeleteCommentButton commentId={comment.id} setComments={setComments} comments={comments} setFilteredComments={setFilteredComments} filteredComments={filteredComments}/></td>
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
            className="px-4 py-2 bg-gray-300 rounded mx-1">
            Anterior
        </button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded mx-1">
            Siguiente
        </button>
        </div>
    </>
  )
}

export default CommentTable