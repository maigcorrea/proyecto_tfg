import React from 'react'
import { useState, useContext } from 'react';
import { selectUserTags } from '../services/userService';
import { UserContext } from '../../context/UserrContext';
import {useNavigate} from 'react-router-dom';

const SelectTags = () => {
  const navigate= useNavigate();

  // Etiquetas predefinidas
    const predefinedTags = [
        'Neurología', 'Genética', 'Dermatología', 'Autoinmunes',
        'Pediatría', 'Oncología', 'Raras', 'Síntomas crónicos',
        'Diagnóstico', 'Apoyo emocional', 'Investigación', 'Tratamientos'
    ];

    // Estado para las etiquetas seleccionadas y la etiqueta personalizada
    const [selectedTags, setSelectedTags] = useState([]);
    const [customTag, setCustomTag] = useState('');

    const [message, setMessage] = useState("");
    

    const [cont, setCont] = useState(0);

    // Para guaradar las tags en el contexto global
    const { setUserSession } = useContext(UserContext);


    // Función para alternar la selección de etiquetas
    // Si la etiqueta ya está seleccionada, la deselecciona
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag));
            setCont(prev => prev - 1);
        } else if (selectedTags.length < 12) { // Si no está seleccionada y hay espacio, la selecciona
            setSelectedTags(prev => [...prev, tag]);
            setMessage("Sólo puedes seleccionar un máximo de 12 temas de interés");
            setCont(prev => prev + 1);
        }
    };

   //Añade una etiqueta personalizada a la lista de etiquetas seleccionadas
    const addCustomTag = () => {
        const trimmed = customTag.trim();
        if (trimmed && !selectedTags.includes(trimmed) && selectedTags.length < 12) {
            setSelectedTags(prev => [...prev, trimmed]);
            setCustomTag('');
            setCont(prev => prev + 1);
        }
    };

    //Añade la etiqueta personalizada al pulsar enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomTag();
        }
    };

    const handleContinue = async() =>{
      //Lógica para meter las tags en la bd
      selectUserTags(selectedTags)
      .then(res => {
        console.log('Respuesta del frontend:', res);
        console.log("TAGS PARA GUARDAR EN EL CONTEXTO", res.tags);
        if (res?.success) {
          // Actualizar contexto
          setUserSession(prev => ({
            ...prev,
            tags:res.tags //Las tags se guardarían en el contesto así: ['Genética', 'Diagnóstico']
          }))

          // Redirigir a la pantalla principal
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Error al hacer la petición:', err);
      });
    }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-white via-[#e8f5f1] to-[#a1c7c0]">
        <h1 className="text-xl md:text-4xl font-bold mb-8 md:mb-12 text-[#4b8376] text-center">Selecciona tus temas de interés</h1>

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
              className={`px-4 py-2 md:px-8 md:py-4 rounded-full cursor-pointer border-2 font-medium md:font-semibold text-sm md:text-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a1c7c0] shadow-sm
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
          <button onClick={() => {
              setUserSession(prev => ({
                ...prev,
                tags: [], // asegurar que el contexto queda en blanco
              }));
              navigate('/');
            }}
            className="text-base md:text-md text-black hover:underline cursor-pointer transition-all px-2 py-2 md:px-6 md:py-3">
            Saltar
          </button>

          <button
            className={`px-6 py-2 md:px-12 md:py-4 rounded-full font-bold text-md cursor-pointer md:text-md text-[#181c1b] bg-[#a1c7c0] shadow-md transition-all duration-200 hover:bg-[#7bb8a8] disabled:bg-gray-400 disabled:text-gray-200 ${selectedTags.length === 12 ? 'opacity-60 cursor-not-allowed ' : ''}`}
            disabled={selectedTags.length === 12}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectTags