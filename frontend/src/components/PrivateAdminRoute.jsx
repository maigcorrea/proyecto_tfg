import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';
import {getSessions} from '../services/authService';

const PrivateAdminRoute = ({children}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [tipo, setTipo] = useState(null)
    const [loading, setLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const checkType= async () => {
            try{
                const sesionsResponse= await getSessions("tipo");
                setTipo(sesionsResponse);
            }catch(error) {
                console.error("Error al obtener tipo de sesión", error);
            } finally {
                setLoading(false);
            }
        }   
        checkType();
    }, []);

    
    useEffect(() => {
        if (!loading && tipo !== "admin") {
            console.log("Redirigiendo a /unauthorized porque tipo:", tipo);
            navigate("/unathorized", { replace: true }); // Redirigir reemplazando historial
        }
    }, [loading, tipo, navigate]);

    if (loading) {
        return <div>Cargando... (puedes poner un spinner)</div>;
      }

    return <>{children}</>;
  /*
  return (
    <>
        { tipo === "admin" ? children : navigate("/unathorized")}
    </>
  )
    */
}

export default PrivateAdminRoute