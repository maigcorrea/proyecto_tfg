import React from 'react'
import DeletePostButton from '../components/AdminPanel/DeletePostButton'
import PostDetails from '../components/AdminPanel/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { HiArrowUturnLeft } from "react-icons/hi2";


const PostDetailsAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
  return (
    <>
        <div className="p-4 bg-white block sm:flex items-center justify-end gap-6 border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <button className='cursor-pointer text-gray-600 hover:text-gray-800 font-medium flex items-center' onClick={() => navigate("/admin/posts")}><HiArrowUturnLeft className='inline mr-2 size-5' />Volver</button>
            <DeletePostButton postId={id}></DeletePostButton>
        </div>
        <PostDetails></PostDetails>
        
    </>
  )
}

export default PostDetailsAdmin