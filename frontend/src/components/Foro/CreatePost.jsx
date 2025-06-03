import React, {useState, useContext} from 'react'
import { UserContext } from '../../../context/UserrContext'

const CreatePost = ({onCreate}) => {

  const { userSession } = useContext(UserContext);
  const [contenido, setContenido] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = () => {
    if (contenido.trim()) {
      onCreate(contenido);
      setContenido('');
      setMostrarModal(false);
    }
  };

  // VER APUNTE EN Foro.jsx SOBRE SIMPLIFICAR MÁS LA LÓGICA:  Se puede mover la llamada a addPost directamente a CreatePost.jsx, haciendo que el propio componente gestione la creación del post desde el contexto. Así no se necesita pasarle onCreate desde Foro.jsx. (Hacerlo en caso de que no se reutilice CreatePost.jsx en el futuro, si se reutiliza, dejarlo así para poder pasarle otra función como prop desde otro componente o página).

  return (
    <>
        {/* 🔹 Área inicial */}
      <div
        className="bg-white p-4 rounded shadow mb-6 flex items-center space-x-4 cursor-pointer"
        onClick={() => setMostrarModal(true)}
      >
        <img
          src={userSession.img ? `/userAssets/${userSession.id}/${userSession.img}` : `/userAssets/default/defaultImg.png`}
          alt="perfil"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full">
          ¿Qué estás pensando, {userSession.usuario}?
        </div>
      </div>

      {/* 🔹 Modal flotante */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            {/* Botón cerrar */}
            <button
              className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setMostrarModal(false)}
            >
              &times;
            </button>

            <div className="flex items-center mb-4 space-x-3">
              <img
                src={userSession.img ? `/userAssets/${userSession.id}/${userSession.img}` : `/userAssets/default/defaultImg.png`}
                alt="perfil"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-semibold">{userSession.usuario}</p>
            </div>

            <textarea
              className="w-full h-40 border rounded px-3 py-2 text-sm"
              placeholder="¿Sobre qué quieres hablar?"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />

            <div className="text-right mt-4">
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded ${
                  contenido.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!contenido.trim()}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost