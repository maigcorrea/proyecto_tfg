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

    // Para guaradar las tags en el contexto global
    const { setUserSession } = useContext(UserContext);


    // Función para alternar la selección de etiquetas
    // Si la etiqueta ya está seleccionada, la deselecciona
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag));
        } else if (selectedTags.length < 12) { // Si no está seleccionada y hay espacio, la selecciona
            setSelectedTags(prev => [...prev, tag]);
        }
    };

   //Añade una etiqueta personalizada a la lista de etiquetas seleccionadas
    const addCustomTag = () => {
        const trimmed = customTag.trim();
        if (trimmed && !selectedTags.includes(trimmed) && selectedTags.length < 12) {
            setSelectedTags(prev => [...prev, trimmed]);
            setCustomTag('');
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
         <div className="min-h-screen flex flex-col justify-between p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">Selecciona tus temas de interés</h1>

        <input
          type="text"
          placeholder="Buscar o añadir tema..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        />

        <div className="flex flex-wrap gap-3 justify-center">
          {[...predefinedTags, ...selectedTags.filter(tag => !predefinedTags.includes(tag))].map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1 rounded-full border transition ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-10 max-w-3xl mx-auto w-full">
        <button className="text-sm text-gray-600 hover:underline">Saltar</button>
        <button
          className={`px-6 py-2 rounded-full text-white transition ${
            selectedTags.length < 12
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
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