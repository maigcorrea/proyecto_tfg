import React from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

const PrivateAdminRoute = ({children}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
  return (
    <>
        {user && user.tipo === "admin" ? children : navigate("/unathorized")}
    </>
  )
}

export default PrivateAdminRoute