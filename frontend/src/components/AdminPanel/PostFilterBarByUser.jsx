import React, { useEffect, useState } from 'react'
import { getAllUsersCopia } from '../../services/userService';
import Select from 'react-select'


const PostFilterBarByUser = ({onUserChange}) => {
    const [formattedUsers, setFormattedUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
               const response = await getAllUsersCopia();
               setFormattedUsers(response.map(user => ({ value: user.id, label: user.nickname })));
            } catch (error) {
                console.error("Error obteniendo todos los usuarios", error);
            }  
        }

        getUsers();
    }, []);

    console.log("FORMATTED USUARIOS", formattedUsers);
    //setFormattedUsers(users.map(user => ({ value: user.id, label: user.nickname })));
    

    const handleChange = (selectedOption) => {
        onUserChange(selectedOption ? selectedOption.value : null);
    };
  return (
    <>
        
        <Select options={formattedUsers} placeholder="Filtrar por usuario"
        isClearable onChange={handleChange}/>
    </>
  )
}

export default PostFilterBarByUser