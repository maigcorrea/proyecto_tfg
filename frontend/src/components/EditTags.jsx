import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getUserTags } from '../services/userService';
import { updateTags } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserrContext';

const EditTags = () => {
    const navigate = useNavigate();
    const { userSession, setUserSession } = useContext(UserContext);
    const { id } = useParams();

    const predefinedTags = [
        'Neurología', 'Genética', 'Dermatología', 'Autoinmunes',
        'Pediatría', 'Oncología', 'Raras', 'Síntomas crónicos',
        'Diagnóstico', 'Apoyo emocional', 'Investigación', 'Tratamientos'
    ];


    const [selectedTags, setSelectedTags] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [message, setMessage] = useState("");
    const [cont, setCont] = useState(0);
    const [loading, setLoading] = useState(false);

    // Control de acceso para que solo los admin puedan acceder a /edit-tags/:id de otros usuarios y los usu solo puedan acceder a su propio /edit-tags/:id
    useEffect(() => {
      if (!userSession) return; // Si no hay sesión (opcional, depende del flujo)
      if (userSession.tipo === "usu" && userSession.id.toString() !== id) {
        // Redirige a unauthorized o home si es un usuario normal que intenta editar otro perfil
        navigate('/unathorized');
        console.log("DIFERENCIAAA: USUARIO EN CONTEXTO", userSession.id, "ID QUE LLEGA POR PARÁMETRO" , id);
      }
    }, [userSession, id, navigate]);

    // Obtener tags actuales del usuario al cargar
    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await getUserTags(id);
                console.log('Tags actuales del usuario:', response);
                
                setSelectedTags(response);
                setCont(response.length);
            } catch (error) {
                console.error('Error al obtener los tags del usuario:', error);
            }
        };
        getTags();
    }, [id]);

    //Alternar selección de etiquetas
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag));
            setCont(prev => prev - 1);
        } else if (selectedTags.length < 12) {
            setSelectedTags(prev => [...prev, tag]);
            setMessage("Sólo puedes seleccionar un máximo de 12 temas de interés");
            setCont(prev => prev + 1);
        }
    };

    //Añadir etiqueta personalizada
    const addCustomTag = () => {
        const trimmed = customTag.trim();
        if (trimmed && !selectedTags.includes(trimmed) && selectedTags.length < 12) {
            setSelectedTags(prev => [...prev, trimmed]);
            setCustomTag('');
            setCont(prev => prev + 1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomTag();
        }
    };


    const handleContinue = async() =>{
      setLoading(true); // Mostrar spinner y desactivar botones

      try {
        const response = await updateTags(id, selectedTags);
        console.log('Tags actualizados del usuario:', response);
        setMessage(response.message);

        if(response.success){
          if(userSession.tipo === "usu"){
            //Actualizar contexto del usuario con los nuevos tags
            setUserSession(prev => ( {...prev, tags:selectedTags} ));
            navigate('/my-profile');
          }else{
            navigate('/admin/users');
          }
        }
      } catch (error) {
        console.error('Error al actualizar los tags del usuario:', error);
      }finally {
        setLoading(false); // Ocultar spinner y reactivar botones
    }
      
    }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-white via-[#e8f5f1] to-[#a1c7c0]">
      <h1 className="text-xl md:text-4xl font-bold mb-8 md:mb-12 text-[#4b8376] text-center">Edita tus temas de interés</h1>

      <div className="w-full max-w-xs md:max-w-4xl flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6 md:mb-10 mx-auto">
        <input
          type="text"
          placeholder="Buscar o añadir tema..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 md:px-8 md:py-5 rounded-full bg-[#f3f4f6] border-2 border-[#a1c7c0] text-base md:text-xl text-[#222] placeholder:text-[#a1c7c0]/60 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#a1c7c0] focus:border-[#a1c7c0] transition-all duration-200"
        />
        <span className="text-black font-semibold text-base md:text-lg">{cont}/12</span>
      </div>

      {selectedTags.length === 12 && <p className='text-red-500 text-sm mb-2'>Sólo puedes seleccionar un máximo de 12 temas de interés</p>}

      <div className="flex flex-wrap gap-3 md:gap-6 justify-center w-full max-w-xs md:max-w-4xl mb-8 md:mb-14 mt-2 md:mt-4">
        {[...predefinedTags, ...selectedTags.filter(tag => !predefinedTags.includes(tag))].map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 md:px-8 md:py-4 rounded-full border-2 font-medium md:font-semibold text-sm md:text-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a1c7c0] shadow-sm
              ${selectedTags.includes(tag)
                ? 'bg-[#a1c7c0] text-[#181c1b] border-[#a1c7c0] scale-105 shadow-lg'
                : 'bg-[#f3f4f6] text-[#4b8376] border-[#e0ece9] hover:bg-[#e8f5f1] hover:border-[#a1c7c0] hover:text-[#222]'}
            `}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex justify-between w-full max-w-xs md:max-w-4xl mt-8 md:mt-12 mx-auto">
        <button className="text-base md:text-md text-black hover:underline cursor-pointer transition-all px-2 py-2 md:px-6 md:py-3" onClick={() => {
          if(userSession.tipo === "usu"){
            navigate('/my-profile');       
          }else{
            navigate('/admin/users');
          }
        }} disabled={loading}>Volver</button>
        <button
          className={`px-6 py-2 md:px-12 md:py-4 rounded-full font-bold text-md md:text-md text-[#181c1b] bg-[#a1c7c0] shadow-md transition-all duration-200 hover:bg-[#7bb8a8] disabled:bg-gray-400 disabled:text-gray-200 ${selectedTags.length === 12 || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={selectedTags.length === 12 || loading}
          onClick={handleContinue}
        >
          {loading ? (
              <span className="loader">Cargando...</span>
          ) : (
              'Continuar'
          )}
        </button>
      </div>
    </div>
  )
}

export default EditTags