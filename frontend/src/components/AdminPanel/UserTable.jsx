import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../services/userService';
import { deleteUser } from '../../services/userService';
import { updateUser } from '../../services/userService';

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
      <input 
        type="text" 
        placeholder="Buscar nickname..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="border p-2 my-2 w-full" 
      />
      <table>
        <thead>
          <th></th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Nacimiento</th>
          <th>Teléfono</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </thead>
        <tbody>
        {
          users && filteredUsers.map((user) => (
            <tr>
              <td><img src={ user.img ? `/userAssets/${user.id}/${user.img}` : `/userAssets/default/defaultImg.png`} alt={user.nickname} className='w-10 h-10 rounded-full' /></td>
              <td><a href={`/admin/user/${user.id}`} className='hover:text-blue-500'>{user.nickname}</a></td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.nacimiento}</td>
              <td>{user.telefono}</td>
              <td>{user.descripcion}</td>
              <td className='flex gap-2'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setEditUser(user); setPreviewImage(null);}}>Editar</button><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => {setConfirmDeleteId(user.id)}}>Eliminar</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>

      {/* Paginación */}
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-1"
      >
        Siguiente
      </button>
    </div>

      <p>{message}</p>


      {/* Modal de confirmación */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : "Sí, eliminar"}
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setConfirmDeleteId(null)} disabled={isDeleting}>Cancelar</button>
            </div>
          </div>
        </div>
      )}



      {/* Spinner de carga */}
      {/*isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      )*/}


      {/*Prueba*/}
      {/*<div class="fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex" id="edit-user-modal" aria-modal="true" role="dialog">
    <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
        {// <!-- Modal content --> }
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            {//<!-- Modal header --> }
            <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 class="text-xl font-semibold dark:text-white">
                    Edit user
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="edit-user-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            {// <!-- Modal body --> }
            <div class="p-6 space-y-6">
                <form action="#">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" name="first-name" value="Bonnie" id="first-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required=""></input>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname</label>
                            <input type="text" name="last-name" value="Green" id="last-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required=""></input>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" value="bonnie@flowbite.com" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required=""></input>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                            <input type="number" name="position" value="React Developer" id="position" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="609474291" required=""></input>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="current-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                            <input type="password" name="current-password" value="••••••••" id="current-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required=""></input>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="new-password" value="••••••••" id="new-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required=""></input>
                        </div>
                        <div class="col-span-6">
                            <label for="biography" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                            <textarea id="biography" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="👨‍💻Full-stack web developer. Open-source contributor.">👨‍💻Full-stack web developer. Open-source contributor.</textarea>
                        </div>
                    </div> 
                </form></div>
                {/* <!-- Modal footer --> }
                <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
                </div>
            
        </div>
    </div>
      </div>*/}

         {/* Modal de edición */}
      {editUser && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Editar usuario: {editUser.nickname}</h2>
            <form onSubmit={handleUpdateUser} encType="multipart/form-data" action="" method="post">
              <div className="mb-2">
                <img src={previewImage || `/userAssets/${editUser.id}/${editUser.img}`} alt="Imagen de perfil del usuario" className=' w-[200px] h-[200px] rounded-full object-cover cursor-pointer hover:brightness-75 transition-all duration-600'onClick={handleImageClick} />
                <input type="file" name='newImg' accept="image/*" className='hidden' ref={fileInputRef}  onChange={handleImgChange} />
              </div>

              <div className="mb-2">
                <label>Nickname</label>
                <input type="text" name="nickname" defaultValue={editUser.nickname} className="border p-2 w-full" />
              </div>

              <div className="mb-2">
                <label>Nombre</label>
                <input type="text" name='nombre' defaultValue={editUser.nombre} className="border p-2 w-full" />
              </div>
              <div className="mb-2">
                <label>Email</label>
                <input type="email" name='email' defaultValue={editUser.email} className="border p-2 w-full" />
              </div>
              <div className="mb-2">
                <label>Teléfono</label>
                <input type="text" name='telefono' defaultValue={editUser.telefono} className="border p-2 w-full" />
              </div>
              <div className="mb-2">
                <label>Nacimiento</label>
                <input type="date" name='nacimiento' defaultValue={editUser.nacimiento} className="border p-2 w-full" />
              </div>
              <div className="mb-2">
                <label>Descripción</label>
                <textarea name='descripcion' defaultValue={editUser.descripcion} className="border p-2 w-full" />
              </div>
              <div className="mb-2">
                <label>Tags</label><br></br>
                
                  <div className='flex flex-wrap space-between'>
                    {!editUser.tags && <span>Sin tags</span>}
                    {editUser.tags && editUser.tags.split(', ').map((tag, index) => (
                      <span key={index} className="display-inline bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                
                <Link to={`/edit-tags/${editUser.id}`} className='inline p-2 bg-blue-500 text-white'>Pincha aquí para añadir/editar tags</Link>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
                <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditUser(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </>
  )
}

export default UserTable;