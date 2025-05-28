import React, { useEffect, useState } from 'react'
import css from './FormLogin.module.css';
import { sendLoginData } from "../services/authService";
import { setSessions } from "../services/authService";
import { useNavigate } from "react-router";

const FormLogin = () => {
    const navigate= useNavigate();

    //Importar dinámicamente el link de icons de Google
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=visibility,visibility_off';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    
        // Limpieza si el componente se desmonta
        return () => {
          document.head.removeChild(link);
        };
      }, []);

      //Enviar datos del formulario a PHP con formData

      //Definir los datos que se van a enviar
      const [nickname, setNickname] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        
      //Crear formData - Crea un objeto que contiene los datos que se quieren enviar al backend
      const formData= new FormData();
      formData.append("nickname", nickname);
      formData.append("password", password);

      try{
        //Llamar al servicio que hace la petición, es decir, llamar a la función dentro de /services/userService.js
        const response = await sendLoginData(formData);
        
        // 3. Trabajamos con la respuesta
        console.log('Respuesta del backend:', response);
        console.log('Datos de la respuesta:', response.success);
        console.log(typeof response.success);
        
        // Aquí decides si rediriges, guardas el token, etc.

        // Si response.data es un string, convierte ese string a un objeto JSON
        // const responseData = JSON.parse(response.data);
        
        if (response.success) {
            // Si el backend devuelve algo como success: true
            //LLamar al servicio que hace la petición para setear las sesiones
            const sesionsResponse= await setSessions(formData);
            console.log("Sesiones:",sesionsResponse.success);
            console.log("Sesiones:",sesionsResponse);
            console.log("Datos que supuestamente están guardados en las sesiones:",sesionsResponse.usu," ",sesionsResponse.tipo, " ", sesionsResponse.id);
            console.log("Hay sesión:",sesionsResponse.contenidoSesion);

            if(sesionsResponse.success){
              const tipo=sesionsResponse.type;
              console.log("Sesiones:",sesionsResponse.success);
              alert(response.message);
              // Redirige o guarda el token, lo que necesites
              //Redirigir al dashboard en función del tipo de usuario
              if(sesionsResponse.tipo==="usu"){
                navigate("/");
                setInterval(location.reload(),10000);
              }else{
                navigate("/dashboard");
                setInterval(location.reload(),10000);
              }

            }
        } else {
            alert(response.message || 'Credenciales incorrectas');
        }
      }catch(error){
        console.error('Error en el login:', error);
      }
    };

  return (
    <>
        <div className='bg-gray-500 h-screen flex items-center'>
            <div className={css.formInicio}>
                <div className={css.formSecundario}>
                    <form onSubmit={handleSubmit} action="" method="post" className=''>
                        <label htmlFor="nickname">Nickname o email:</label><br></br>
                        <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className='border outline-none' id="" required /><br></br>
                        <label htmlFor="contr">Contraseña:</label><br></br>
                        <div className='relative w-fit'>
                            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="" placeholder="Indica tu contraseña" className='border outline-none' required />
                            <i className="material-symbols-outlined eye absolute right-[10px] bottom-[0px]">
                            visibility
                            </i>
                        </div>

                        <input type="submit" value="Enviar" className='border cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default FormLogin