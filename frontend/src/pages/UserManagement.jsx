import React, { useState } from 'react';
import UserTable from '../components/AdminPanel/UserTable';
import CreateNewUserButton from '../components/AdminPanel/CreateNewUserButton';
import Toast from '../components/UI/Toast';

const UserManagement = () => {
  const [message, setMessage] = useState('');
  
  return (
    <div className="relative">
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <CreateNewUserButton setMessage={setMessage} />
      </div>
      <UserTable />
      
      {/* Toast de notificación */}
      <Toast 
        message={message} 
        type={message?.includes('Error') ? 'error' : 'success'}
        onClose={() => setMessage('')} 
      />
    </div>
  )
}

export default UserManagement