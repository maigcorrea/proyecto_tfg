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
          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer" onClick={(e) => handleClickDiv(e,user.nickname)}>
              <img
                  src={user.img ? `/userAssets/${user.id}/${user.img}` : '/userAssets/default/defaultImg.png'}
                  alt={user.nickname}
                  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover border"
              />
              <h3 className="text-lg font-semibold">{user.nombre}</h3>
              <p className="text-sm text-gray-500">@{user.nickname}</p>
              <p className="text-sm text-gray-500">{user.nacimiento ? `${calcularEdad(user.nacimiento)} años` : 'Edad no disponible'}</p>

                <p className="text-sm text-gray-700">
                En común: {calcularCoincidencias(user.tags)}/12
                </p>
              {user.tags && (
                  <div className="mt-2 text-xs text-blue-600">
                      <span className="font-medium">Tags:</span> {user.tags}
                  </div>
              )}

              {user.permiso == 1 && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 cursor-pointer" onClick={(e) => handleClickBoton(e,user.email)}>Contactar</button>
              )}
          </div>
    </>
  )
}

export default UserCard