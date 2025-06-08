import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserrContext'
import { useNavigate } from 'react-router-dom';

const UserCard = ({user}) => {
  const navigate = useNavigate();
  
    console.log('Renderizando UserCard para:', user);


    const { userSession } = useContext(UserContext);

    React.useEffect(() => {
  console.log('Contexto del usuarioOOO:', userSession);
}, [userSession]);

    const calcularCoincidencias = (tagsDelOtroUsuario) => {

        if (!Array.isArray(userSession?.tags) || !tagsDelOtroUsuario) {
            console.log('No hay tags en el contexto o en el otro usuario');
            return 0;
        }

        const propias = userSession?.tags || [];
        const otras = tagsDelOtroUsuario || [];

        console.log('Mis tags:', userSession.tags);
        console.log('Tags del otro usuario:', otras);

        const coincidencias = propias.filter(tag => otras.includes(tag));

        return coincidencias.length;
    };


    //Calcular edad del usuario
  const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return null;

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
};

const handleClickDiv = (e, nickname) => {
  navigate(`/userDetail/${nickname}`);
};

const handleClickBoton = (e, email) => {
  e.stopPropagation(); //Evita la propagación del evento al padre (div)
  console.log("Email: ", email);
  /*const mailToUrl = `mailto:${email}`; //mailto es para abrir cualquier cliente configurado como predeterminado.
  console.log("mailToUrl: ", mailToUrl);
  window.location.href = mailToUrl;*/

  // Abre Gmail con el campo 'Para' ya rellenado
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`; //Abrir gmail en una pestaña del navagador
  window.open(gmailUrl, '_blank');
};

  return (
    <>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 cursor-pointer border border-gray-100 relative overflow-hidden group" onClick={(e) => handleClickDiv(e,user.nickname)}>
            {/* Imagen de usuario */}
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 rounded-full shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={user.img ? `/userAssets/${user.id}/${user.img}` : '/userAssets/default/defaultImg.png'}
                  alt={user.nickname}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Nombre y nickname */}
            <h3 className="text-xl font-bold text-gray-800 mb-1">{user.nombre}</h3>
            <p className="text-sm text-blackfont-medium mb-1">@{user.nickname}</p>
            <p className="text-xs text-gray-500 mb-2">{user.nacimiento ? `${calcularEdad(user.nacimiento)} años` : 'Edad no disponible'}</p>

            {/* En común */}
            <div className="flex items-center justify-center mb-2">
              <span className="bg-[#a6d3cb] text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                En común: {calcularCoincidencias(user.tags)}/12
              </span>
            </div>

            {/* Tags del usuario */}
            {user.tags && user.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-2">
                <span className="block w-full text-xs text-gray-500 mb-1 text-center font-medium">Tags:</span>
                {(Array.isArray(user.tags) ? user.tags : String(user.tags).split(',')).map((tag, idx) => {
                  const tagTrim = tag.trim();
                  const propias = userSession?.tags || [];
                  const enComun = propias.includes(tagTrim);
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-full text-xs font-medium border shadow-sm transition
                        ${enComun ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-300 text-gray-700 border-gray-600'}`}
                    >
                      {tagTrim}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Botón Contactar */}
            {user.permiso == 1 && (
              <button
                className="relative overflow-hidden py-2 px-8 rounded-full mt-4 font-bold text-white shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 focus:outline-none hover:scale-105 active:scale-95 group"
                style={{backgroundSize: '200% 200%', backgroundPosition: '0% 50%'}}
                onClick={(e) => handleClickBoton(e,user.email)}
              >
                <span className="relative z-10">Contactar</span>
                {/* Efecto pulse */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-pulse bg-white"></span>
              </button>
            )}
          </div>
    </>
  )
}

export default UserCard