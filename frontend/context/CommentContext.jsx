import React, { createContext, useState, useEffect } from 'react';
import { getCommentsByPost, getCommentsByUser, createComment, getAllComments } from '../services/commentService';

export const CommentContext = createContext();
export const CommentProvider = ({ children }) => {
  //const [comments, setComments] = useState([]);
  const [commentsByPost, setCommentsByPost] = useState({});    // { postId: [comentarios] }
  const [commentsByUser, setCommentsByUser] = useState({});    // { userId: [comentarios] }
  const [commentsCountByPost, setCommentsCountByPost] = useState({});  // { postId: count }

  // Obtener todos los comentarios del sistema (opcional)
  const loadAllComments = async () => {
    try {
      const response = await getAllComments();
      if (response.success) {
        console.log('Comentarios totales:', response.comments);
        // Podrías actualizar commentsByPost si deseas
      } else {
        console.error('Error cargando todos los comentarios:', response);
      }
    } catch (error) {
      console.error('Error en loadAllComments:', error);
    }
  };

  // Obtener comentarios por post y actualizar contador
  const loadCommentsByPost = async (postId) => {
    try {
      const response = await getCommentsByPost(postId);
      if (response.success) {
        setCommentsByPost(prev => ({ ...prev, [postId]: response.comments }));
        setCommentsCountByPost(prev => ({ ...prev, [postId]: response.comments.length }));
      } else {
        console.error('Error cargando comentarios del post:', response);
      }
    } catch (error) {
      console.error('Error en loadCommentsByPost:', error);
    }
  };

  // Obtener comentarios por usuario
  const loadCommentsByUser = async (userId) => {
    try {
      const response = await getCommentsByUser(userId);
      if (response.success) {
        setCommentsByUser(prev => ({ ...prev, [userId]: response.comments }));
      } else {
        console.error('Error cargando comentarios del usuario:', response);
      }
    } catch (error) {
      console.error('Error en loadCommentsByUser:', error);
    }
  };

  // Crear comentario
  /*const addComment = async (formData) => {
    try {
      const response = await createComment(formData);
      if (response.success) {
        // Opcional: recargar comentarios del post o agregar manualmente
        // Aquí podrías recargar desde backend o añadir el nuevo comentario al estado
        await loadCommentsByPost(formData.get('postId'));
      } else {
        console.error('Error al crear comentario:', response);
      }
    } catch (error) {
      console.error('Error en addComment:', error);
    }
  };*/

  // Añadir un comentario nuevo
  const addComment = async (formData) => {
    try {
      const response = await createComment(formData);
      if (response.success) {
        const postId = formData.get('postId');
        const nuevoComentario = response.comment || {
          id: Date.now(),  // Solo como ejemplo si backend no devuelve
          contenido: formData.get('contenido'),
          usuario_nombre: 'Tú', // Podrías obtenerlo del contexto
          fecha: new Date().toISOString(),
        };
        // Añadir comentario localmente
        setCommentsByPost(prev => ({
          ...prev,
          [postId]: prev[postId] ? [nuevoComentario, ...prev[postId]] : [nuevoComentario]
        }));
        // Incrementar contador local
        setCommentsCountByPost(prev => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1
        }));
      } else {
        console.error('Error al crear comentario:', response);
      }
    } catch (error) {
      console.error('Error en addComment:', error);
    }
  };

  return (
    <CommentContext.Provider value={{
      //comments,
      commentsByPost,
      commentsByUser,
      commentsCountByPost,
      loadAllComments,
      loadCommentsByPost,
      loadCommentsByUser,
      addComment,
    }}>
      {children}
    </CommentContext.Provider>
  );
};