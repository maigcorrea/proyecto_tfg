import React, {useState, useContext, useRef, useEffect} from 'react'
import { UserContext } from '../../../context/UserrContext'

const CreatePost = ({onCreate}) => {

  const { userSession } = useContext(UserContext);
  const [contenido, setContenido] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Para animación de cierre


  // Permitir cerrar modal haciendo click fuera
  const modalBgRef = React.useRef();
  const handleBgClick = (e) => {
    if (e.target === modalBgRef.current) setMostrarModal(false);
  };

  // Autoajuste de altura del textarea
  const textareaRef = React.useRef();
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [contenido, mostrarModal]);

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
        {/* Área inicial */}
      <div
        className="bg-white p-5 rounded-2xl shadow-lg mb-8 flex items-center gap-5 cursor-pointer border border-gray-100 hover:shadow-2xl transition-all mt-20"
        onClick={() => {
          setModalVisible(true);
          setMostrarModal(true);
        }}
        title="Haz click para crear un post"
      >
        <img
          src={userSession.img ? `/userAssets/${userSession.id}/${userSession.img}` : `/userAssets/default/defaultImg.png`}
          alt="perfil"
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
        />
        <div className="flex-1 bg-gray-100 hover:bg-blue-50 text-gray-600 text-base px-5 py-3 rounded-full transition-colors duration-200">
          ¿Qué estás pensando, {userSession.usuario}?
        </div>
      </div>

      {/* Modal flotante */}
      {modalVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center
            ${mostrarModal ? 'animate-fade-in' : 'animate-fade-out'}
            bg-black/30 backdrop-blur-sm`}
          ref={modalBgRef}
          onClick={handleBgClick}
          onAnimationEnd={() => {
            if (!mostrarModal) setModalVisible(false);
          }}
        >
          <div className={`bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-7 relative border border-gray-100
            ${mostrarModal ? 'animate-modal-pop' : 'animate-modal-unpop'}`}
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-3 right-5 text-2xl font-bold text-gray-400 hover:text-red-500 transition-colors duration-150"
              onClick={() => setMostrarModal(false)}
              title="Cerrar"
            >
              &times;
            </button>

            <div className="flex items-center mb-6 gap-4">
              <img
                src={userSession.img ? `/userAssets/${userSession.id}/${userSession.img}` : `/userAssets/default/defaultImg.png`}
                alt="perfil"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-gray-800">{userSession.usuario}</span>
                <span className="text-xs text-gray-400">Comparte tus ideas con la comunidad</span>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              className="w-full min-h-[64px] max-h-60 resize-none border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
              placeholder="¿Sobre qué quieres hablar?"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              maxLength={500}
              rows={1}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-400">{contenido.length}/500</span>
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-full text-base font-semibold shadow transition-all duration-200
                  ${contenido.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
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