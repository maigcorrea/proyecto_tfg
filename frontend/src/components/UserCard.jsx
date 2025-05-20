import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserrContext'

const UserCard = ({user}) => {
    console.log('Renderizando UserCard para:', user);


    const { userSession } = useContext(UserContext);

    React.useEffect(() => {
  console.log('Contexto del usuario:', userSession);
}, [userSession]);

    const calcularCoincidencias = (tagsDelOtroUsuario) => {

        if (!Array.isArray(userSession?.tags) || !tagsDelOtroUsuario) {
            console.log('No hay tags en el contexto o en el otro usuario');
            return 0;
        }

        const propias = userSession?.tags || [];
        const otras = tagsDelOtroUsuario?.split(',').map(tag => tag.trim()) || [];

        console.log('Mis tags:', propias);
        console.log('Tags del otro usuario:', otras);

        const coincidencias = propias.filter(tag => otras.includes(tag));

        return coincidencias.length;
    };


  return (
    <>
          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <img
                  src={`../../public/userAssets/${user.nickname}/${user.img}` || '/default-avatar.png'}
                  alt={user.nickname}
                  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover border"
              />
              <h3 className="text-lg font-semibold">{user.nombre}</h3>
              <p className="text-sm text-gray-500">@{user.nickname}</p>
              <p className="text-sm text-gray-500">{user.nacimiento || 'País no disponible'}</p>

                <p className="text-sm text-gray-700">
                En común: {calcularCoincidencias(user.tags)}/12
                </p>
              {user.tags && (
                  <div className="mt-2 text-xs text-blue-600">
                      <span className="font-medium">Tags:</span> {user.tags}
                  </div>
              )}
          </div>
    </>
  )
}

export default UserCard