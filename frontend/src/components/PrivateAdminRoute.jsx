import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';
import {getSessions} from '../services/authService';

const PrivateAdminRoute = ({children}) => {
    const { user } = useContext(UserContext);
    const [tipo, setTipo] = useState(null)
    const [loading, setLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const checkType= async () => {
            try{
                const sesionsResponse= await getSessions("tipo");
                setTipo(sesionsResponse.tipo || sesionsResponse); 
            }catch(error) {
                console.error("Error al obtener tipo de sesión", error);
            } finally {
                setLoading(false);
            }
        }   
        checkType();
    }, []);

    if (loading) {
        return <div>Cargando... (puedes poner un spinner)</div>;
    }

    if (tipo !== "admin") {   
        console.log("Redirigiendo a /unauthorized porque tipo:", tipo);
        return <Navigate to="/unathorized" replace />;
    }

    return <>{children}</>;
}

export default PrivateAdminRoute