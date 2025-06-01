import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';
import { getExtendedDataUser } from '../services/userService';
import CommentedPostByUser from './AdminPanel/CommentedPostByUser';
import CommentsMadeByUser from './AdminPanel/CommentsMadeByUser';
import LikedPostByUser from './AdminPanel/LikedPostByUser';
import PostMadeByUser from './AdminPanel/PostMadeByUser';
import { useNavigate } from 'react-router-dom';

const ProfileUserDataExtended = () => {
    const navigate = useNavigate();
    const { userSession } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [postCommented, setPostCommented] = useState([]);
    const [postLiked, setPostLiked] = useState([]);
    const [postCreated, setPostCreated] = useState([])
    console.log("id del usuario loggeado",userSession.id);

    useEffect(() => {
      const getUserDetails = async () => {
        try {
          const response = await getExtendedDataUser(userSession.id);
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
    <>

      <PostMadeByUser postCreated={postCreated}/>
      <LikedPostByUser postLiked={postLiked}/>
      <CommentedPostByUser postCommented={postCommented}/>
      <CommentsMadeByUser comments={comments}/>
    
    </>
  )
}

export default ProfileUserDataExtended