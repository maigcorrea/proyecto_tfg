import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserrContext';
import { getExtendedDataUser } from '../../services/userService';
import CommentedPostByUser from './CommentedPostByUser';
import CommentsMadeByUser from './CommentsMadeByUser';
import LikedPostByUser from './LikedPostByUser';
import PostMadeByUser from './PostMadeByUser';
import { useNavigate } from 'react-router-dom';

const UserDataDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { userSession } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [postCommented, setPostCommented] = useState([]);
    const [postLiked, setPostLiked] = useState([]);
    const [postCreated, setPostCreated] = useState([])
    console.log("id qque llega como parámetro",id);
    console.log("userSession tipo loggeado",userSession.tipo); //Para poder redirigir a una organización u otra en el frontend en función del tipo de usuario que esté loggeado

    useEffect(() => {
      const getUserDetails = async () => {
        try {
          const response = await getExtendedDataUser(id);
          console.log("RESPONSEEEEEEEEEEE",response);
          setPostCommented(response.commented_posts);
          setComments(response.user_comments);
          setPostLiked(response.liked_posts);
          setPostCreated(response.created_posts);
          
        } catch (error) {
          console.log("Error obteniendo los detalles del usuario", error);
        }
      }

      getUserDetails();
    }, [])
    
  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-full mx-auto">
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => navigate('/admin/users')} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Volver a la lista de usuarios
          </button>
        </div>

        <div className="space-y-6 w-full">
          <PostMadeByUser postCreated={postCreated} idUsuario={id} setPostCreated={setPostCreated} />
          <LikedPostByUser postLiked={postLiked} />
          <CommentedPostByUser postCommented={postCommented} />
          <CommentsMadeByUser comments={comments} idUsuario={id} setComments={setComments} />
        </div>
      </div>
    </div>
  )
}

export default UserDataDetails