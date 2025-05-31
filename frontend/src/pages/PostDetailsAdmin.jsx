import React from 'react'
import DeletePostButton from '../components/AdminPanel/DeletePostButton'
import PostDetails from '../components/AdminPanel/PostDetails'
import { useParams } from 'react-router-dom'

const PostDetailsAdmin = () => {
    const { id } = useParams();
  return (
    <>
        <div className="p-4 bg-white block sm:flex items-center justify-end border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <DeletePostButton postId={id}></DeletePostButton>
        </div>
        <PostDetails></PostDetails>
        
    </>
  )
}

export default PostDetailsAdmin