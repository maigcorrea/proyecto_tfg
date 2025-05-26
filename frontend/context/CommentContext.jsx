import React, { createContext, useState, useEffect } from 'react';
import { getCommentsByPost, getCommentsByUser, createComment, getAllComments } from '../services/commentService';

export const CommentContext = createContext();
export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // Obtener todos los comentarios del sistema (opcional)
  const loadAllComments = async () => {
    try {
      const response = await getAllComments();
      if (response.success) {
        setComments(response.comments);
      } else {
        console.error('Error cargando todos los comentarios:', response);
      }
    } catch (error) {
      console.error('Error en loadAllComments:', error);
    }
  };

  // Obtener comentarios por post
  const loadCommentsByPost = async (postId) => {
    try {
      const response = await getCommentsByPost(postId);
      if (response.success) {
        setComments(response.comments);
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
        setComments(response.comments);
      } else {
        console.error('Error cargando comentarios del usuario:', response);
      }
    } catch (error) {
      console.error('Error en loadCommentsByUser:', error);
    }
  };

  // Crear comentario
  const addComment = async (formData) => {
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
  };

  return (
    <CommentContext.Provider value={{
      comments,
      loadAllComments,
      loadCommentsByPost,
      loadCommentsByUser,
      addComment,
    }}>
      {children}
    </CommentContext.Provider>
  );
};