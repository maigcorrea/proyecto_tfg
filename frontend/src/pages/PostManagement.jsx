import React from 'react'
import PostTable from '../components/AdminPanel/PostTable'
import CreateNewPostButton from '../components/AdminPanel/CreateNewPostButton'

const PostManagement = () => {
  return (
    <>
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className='flex gap-6'>
            <input type="text" placeholder="Search" />
            <select name="usuario" id="">
                <option value="" disabled selected>Filtrar por usuario</option>
                <option value="el id del usuario">El nickname del usuario</option>
                <option value="el id del usuario">El nickname del usuario</option>
                <option value="el id del usuario">El nickname del usuario</option>
            </select>
        </div>
        <CreateNewPostButton></CreateNewPostButton>
      </div>
        <PostTable></PostTable>
    </>
  )
}

export default PostManagement