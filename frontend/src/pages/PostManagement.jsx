import React, { useState } from 'react'
import PostTable from '../components/AdminPanel/PostTable'
import CreateNewPostButton from '../components/AdminPanel/CreateNewPostButton'
import PostFilterBarByUser from '../components/AdminPanel/PostFilterBarByUser'

const PostManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
    setCurrentPage(1); // Reiniciamos la paginación al seleccionar nuevo usuario
  };

  return (
    <>
    <div className="p-4 bg-white block sm:flex items-end flex-row-reverse justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
       <PostFilterBarByUser onUserChange={handleUserChange} ></PostFilterBarByUser>
        {/*<CreateNewPostButton></CreateNewPostButton>*/}
    </div>
        <PostTable selectedUserId={selectedUserId} currentPage={currentPage} setCurrentPage={setCurrentPage}></PostTable>
    </>
  )
}

export default PostManagement