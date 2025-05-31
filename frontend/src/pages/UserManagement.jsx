import React from 'react'
import UserTable from '../components/AdminPanel/UserTable'
import CreateNewUserButton from '../components/AdminPanel/CreateNewUserButton'

const UserManagement = () => {
  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <input type="text" placeholder="Search" />
        <CreateNewUserButton></CreateNewUserButton>
      </div>
      <UserTable></UserTable>
    </>
  )
}

export default UserManagement