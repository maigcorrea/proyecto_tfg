import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../services/userService';
import { deleteUser } from '../../services/userService';
import { updateUser } from '../../services/userService';
import { FaUsers, FaHome, FaComment, FaBlogger, FaTags, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import Toast from '../UI/Toast';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Nuevo estado para confirmar eliminación
  const [isDeleting, setIsDeleting] = useState(false); // Estado de carga para eliminación
  const [editUser, setEditUser] = useState(null); // Nuevo estado para edición
  const fileInputRef = useRef(null); // Referencia al input de tipo file
  const [previewImage, setPreviewImage] = useState(null); // Nuevo estado para previsualización de imagen
  const limit = 10;

  //Búsqueda
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () =>{
      const offset = (currentPage - 1) * limit;
      const response = await getAllUsers(limit, offset);
      console.log("RESPUESTAAA",response);
      setUsers(response.usuarios);
      setFilteredUsers(response.usuarios);
      setTotalUsers(response.total);
    }

    obtenerUsuarios();
  }, [currentPage]);


  //Paginación
  const totalPages = Math.ceil(totalUsers / limit);

  //Filtrado por nickname
  useEffect(() => {
    // Filtro local por nickname
    const filtered = users.filter(user => user.nickname.toLowerCase().includes(search.toLowerCase()));
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleDelete = async(userId) => {
    try {
      setIsDeleting(true); // Inicia el spinner
      const response = await deleteUser(userId);
      setMessage(response.message);
      if(response.success){
        setUsers(users.filter(user => user.id !== userId)); //Simulado localmente en vez de cargar todos los usuarios de nuevo
        setFilteredUsers(filteredUsers.filter(user => user.id !== userId)); // También actualiza filtrados
      }

    } catch (error) {
      console.log(error);
    }finally {
      setIsDeleting(false); // Finaliza el spinner
      setConfirmDeleteId(null); // Cierra el modal después de eliminar
    }
  }


  //Cuando le das a la imagen de perfil
  const handleImageClick = () => { 
    fileInputRef.current.click(); // Simula un clic en el input de tipo file
  }

  //Cuando seleccionas una nueva imagen
  const handleImgChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    //Que se previsualice la imagen nueva seleccionada
    if (file) {
       // Crea una URL temporal para previsualizar la imagen
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);

        // También puedes guardar el archivo en el estado editUser si quieres usarlo al enviar
        setEditUser(prev => ({ // Guarda el archivo seleccionado en editUser para luego enviarlo al backend.
            ...prev,
            nuevaImagen: file // Guarda el archivo para después
        }));
    }
  }


  const handleUpdateUser = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', editUser.id);
    formData.append('nickname', e.target.nickname.value);
    formData.append('nombre', e.target.nombre.value);
    formData.append('email', e.target.email.value);
    formData.append('telefono', e.target.telefono.value);
    formData.append('f_nac', e.target.nacimiento.value);
    formData.append('descripcion', e.target.descripcion.value);
    formData.append('oldImg', editUser.img); // Imagen original

    if (editUser.nuevaImagen) {
      formData.append('newImg', editUser.nuevaImagen); // Solo si hay nueva imagen
    }
    
    

    try {
      const response = await updateUser(formData);
      console.log("EXITO", response)
      if(response.success){
        setMessage(response.message);

        setEditUser(null); // Cierra modal
        setPreviewImage(null); // Limpiarprevisualización

        setUsers(users.map(user => user.id === editUser.id 
        ? { ...user, 
            nickname: e.target.nickname.value,
            nombre: e.target.nombre.value,
            email: e.target.email.value,
            telefono: e.target.telefono.value,
            nacimiento: e.target.nacimiento.value,
            descripcion: e.target.descripcion.value,
            img: response.img ?? user.img // Usa la nueva imagen si se ha enviado, o mantiene la actual
          } 
        : user
        ));
      }else {
        // Cuando response.success es falso
        setMessage(response.message || "Error inesperado al actualizar usuario.");
      }
    } catch (error) {
      console.log(error);
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nickname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4c7389] focus:border-[#4c7389] sm:text-sm"
        />
      </div>

      {/* Tabla responsive */}
      <div className="overflow-x-auto">
        <div className="min-w-full divide-y divide-gray-200">
          {/* Encabezados - visible en desktop */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 rounded-t-lg">
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1"></div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Usuario</div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1">Nombre</div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Email</div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Teléfono</div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Nacimiento</div>
            <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Acciones</div>
          </div>

          {/* Cuerpo de la tabla */}
          <div className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-1 md:grid-cols-12 hover:bg-gray-50 transition-colors">
                  {/* Imagen - siempre visible */}
                  <div className="px-4 py-3 flex items-center col-span-1">
                    <img 
                      src={user.img ? `/userAssets/${user.id}/${user.img}` : `/userAssets/default/defaultImg.png`} 
                      alt={user.nickname} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>

                  {/* Datos del usuario - responsive */}
                  <div className="px-4 py-3 col-span-2">
                    <div className="text-sm font-medium text-gray-900">
                      <Link to={`/admin/user/${user.id}`} className="text-[#0086d3] hover:text-[#3a5a6d]">
                        {user.nickname}
                      </Link>
                    </div>
                    <div className="md:hidden text-sm text-gray-500">
                      {user.email}
                    </div>
                    <div className="md:hidden text-sm text-gray-500">
                      {user.telefono}
                    </div>
                    <div className="md:hidden text-sm text-gray-500">
                      Nacimiento: {user.nacimiento}
                    </div>
                  </div>

                  <div className="hidden md:block px-4 py-3 col-span-1">
                    <div className="text-sm text-gray-900">{user.nombre || '-'}</div>
                  </div>

                  <div className="hidden md:block px-4 py-3 col-span-2">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </div>

                  <div className="hidden md:block px-4 py-3 col-span-2">
                    <div className="text-sm text-gray-900">{user.telefono || '-'}</div>
                  </div>

                  <div className="hidden md:block px-4 py-3 col-span-2">
                    <div className="text-sm text-gray-900">{user.nacimiento || '-'}</div>
                  </div>

                  {/* Acciones */}
                  <div className="px-4 py-3 col-span-12 md:col-span-2 flex space-x-2">
                    <button
                      onClick={() => {setEditUser(user); setPreviewImage(null);}}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-[#4c7389] hover:bg-[#3a5a6d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c7389]"
                    >
                      <FaEdit className="mr-1" /> Editar
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(user.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                No se encontraron usuarios
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{(currentPage - 1) * limit + 1}</span> a <span className="font-medium">{Math.min(currentPage * limit, totalUsers)}</span> de <span className="font-medium">{totalUsers}</span> usuarios
        </div>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
          >
            Anterior
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#4c7389] text-white hover:bg-[#3a5a6d]'}`}
          >
            Siguiente
          </button>
        </div>
      </div>

      
      {/* Toast de notificación */}
      <Toast 
        message={message} 
        type={message?.includes('Error') ? 'error' : 'success'}
        onClose={() => setMessage('')} 
      />

      {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
  <div className="fixed inset-0  bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto text-center">
      <p className="text-lg font-medium text-gray-800">
        ¿Estás seguro de que quieres eliminar este usuario?
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => handleDelete(confirmDeleteId)}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded flex items-center justify-center transition"
        >
          {isDeleting ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            "Sí, eliminar"
          )}
        </button>

        <button
          onClick={() => setConfirmDeleteId(null)}
          disabled={isDeleting}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

      {/* Modal de edición */}
      {editUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Editar usuario: <span className="text-blue-600">{editUser.nickname}</span>
      </h2>

      <form
        onSubmit={handleUpdateUser}
        encType="multipart/form-data"
        action=""
        method="post"
        className="space-y-4"
      >
        {/* Imagen */}
        <div className="text-center">
          <img
            src={previewImage || `/userAssets/${editUser.id}/${editUser.img}`}
            alt="Imagen de perfil del usuario"
            className="w-40 h-40 mx-auto rounded-full object-cover cursor-pointer hover:brightness-75 transition duration-300"
            onClick={handleImageClick}
          />
          <input
            type="file"
            name="newImg"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImgChange}
            className="hidden"
          />
        </div>

        {/* Campos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nickname</label>
          <input
            type="text"
            name="nickname"
            defaultValue={editUser.nickname}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            defaultValue={editUser.nombre}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            name="telefono"
            defaultValue={editUser.telefono}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nacimiento</label>
          <input
            type="date"
            name="nacimiento"
            defaultValue={editUser.nacimiento}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            defaultValue={editUser.descripcion}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows={3}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {!editUser.tags && <span className="text-sm text-gray-500">Sin tags</span>}
            {editUser.tags &&
              editUser.tags.split(', ').map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
          </div>
          <Link
            to={`/edit-tags/${editUser.id}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition"
          >
            Pincha aquí para añadir/editar tags
          </Link>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditUser(null)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
      )}
    </div>
    </>
  )
}

export default UserTable;