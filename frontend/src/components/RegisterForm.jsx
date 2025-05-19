import React, { useEffect, useState } from 'react'
import css from './FormLogin.module.css';
import { sendRegisterData } from '../services/authService';
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const navigate=useNavigate();
    
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
      const [nombre, setNombre] = useState("");
      const [email, setEmail] = useState("");
      const [nickname, setNickname] = useState("");
      const [telefono, setTelefono] = useState("");
      const [password, setPassword] = useState("");
      const [repPass, setRepPass] = useState("");
      const [nac, setNac] = useState("");
      const [perfil, setPerfil] = useState(null);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      const date = new Date();
      const limitYear = (date.getFullYear()-10)+"-12-31";

      const handleSubmit = async (e) => {
        e.preventDefault();

        //Comprobación de que las contraseñas coinciden
        if (password !== repPass) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Crear el objeto FormData para enviar el archivo junto a otros campos
        const formData=new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("nickname", nickname);
        formData.append("telefono", telefono);
        formData.append("password", password);
        formData.append("nacimiento", nac);
        formData.append("img", perfil);

        try{
            const response= await sendRegisterData(formData);

            //Trabajar la respuesta
            console.log('Respuesta del backend:', response);
            console.log('Datos de la respuesta:', response.success, " ",response.message);

            if(!response.success){
                setError(response.message);
                return;
            }else{
                alert(response.message);
                navigate("/tags");
                window.location.reload();
            }

        }catch(error){
            console.error('Error en el registro:', error);
        }
      }
  return (
    <>
         <div className='bg-gray-500 h-screen flex items-center'>
            <div className={css.formInicio}>
                <div className={css.formSecundario}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" action="" method="post" className='text-center'>
                        <label htmlFor="nombre">Nombre:</label><br></br>
                        <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className='border outline-none' id="" /><br></br>

                        <label htmlFor="email">Email:</label><br></br>
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border outline-none' id="" /><br></br>

                        {/* Comprobar si el nickname ya está pillado */}
                        <label htmlFor="nickname">Nickname:</label><br></br>
                        <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className='border outline-none' id="" /><br></br>

                        {/* Comprobar que el número es válido (Se le puede enviar un sms) */}
                        <label htmlFor="tel">Teléfono:</label><br></br>
                        <input type="number" name="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className='border outline-none' id="" /><br></br>

                        {/* Controlar que el usuario sea mayor de edad */}
                        <label htmlFor="nickname">Nacimiento:</label><br></br>
                        <input type="date" name="nacimiento" value={nac} onChange={(e) => setNac(e.target.value)} min="1927-01-01" max={limitYear} className='border outline-none' id="" /><br></br>

                        {/* Controlar contraseña y que vayan saliendo mensajitos con colores en función de la longitud de la contraseña y cosas de esas */}
                        <label htmlFor="contr">Contraseña:</label><br></br>
                        <div className='relative w-fit text-center m-auto'>
                            <input type="password" name="contr" value={password} onChange={(e) => setPassword(e.target.value)} id="" placeholder="Indica tu contraseña" className='border outline-none' required />
                            <i className="material-symbols-outlined eye absolute right-[10px] bottom-[0px]">
                            visibility
                            </i>
                        </div>


                        <label htmlFor="repContr">Repetir contraseña:</label><br></br>
                        <div className='relative w-fit text-center m-auto'>
                            <input type="password" name="repContr" value={repPass} onChange={(e) => setRepPass(e.target.value)} id="" placeholder="Indica tu contraseña" className='border outline-none' required />
                            <i className="material-symbols-outlined eye absolute right-[10px] bottom-[0px]">
                            visibility
                            </i>
                        </div>

                        <label htmlFor="imgPerfil">Imagen:</label><br></br>
                        <input type="file" name="img" onChange={(e) => setPerfil(e.target.files[0])}
                        accept="image/*" id="" className='cursor-pointer' /><br></br>

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <input type="submit" value="Enviar" className='border cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default RegisterForm