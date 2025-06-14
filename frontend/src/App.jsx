import { useState, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import Foro from './pages/Foro'
import Comunidades from './pages/Comunidades'
import Noticias from './pages/Noticias'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PrivateRoute from './components/PrivateRoute'
import UserPanel from './pages/UserPanel'
import { UserProvider } from '../context/UserrContext'
import SelectTags from './pages/SelectTags'
import DescubrirUsuarios from './pages/DescubrirUsuarios'
import UserDetails from './pages/UserDetails'
import { PostProvider } from '../context/PostContext'
import AdminDashBoard from './pages/AdminDashBoard'
import PrivateAdminRoute from './components/PrivateAdminRoute'
import Unathorized from './pages/Unathorized'
import UserManagement from './pages/UserManagement'
import PostManagement from './pages/PostManagement'
import PostDetailsAdmin from './pages/PostDetailsAdmin'
import CommentsManagement from './pages/CommentsManagement'
import UserDetailsAdmin from './pages/UserDetailsAdmin'
import TagsEdition from './pages/TagsEdition'
import TagsManagement from './pages/TagsManagement'
import AdminLayout from './layout/AdminLayout'
import ScrollToTop from './layout/ScrollToTop'

function App() {

  return (
    <>
      <UserProvider>
        <PostProvider>

          <BrowserRouter>
          <ScrollToTop></ScrollToTop>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Inicio/>}></Route>
                <Route path='discover' element={<PrivateRoute><DescubrirUsuarios></DescubrirUsuarios></PrivateRoute>}></Route>
                <Route path='userDetail/:nickname' element={<PrivateRoute><UserDetails></UserDetails></PrivateRoute>}></Route>
                <Route path='foro' element={<PrivateRoute><Foro/></PrivateRoute>}></Route>
                <Route path='login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Registro></Registro>}></Route>
                <Route path='/my-profile' element={<PrivateRoute><UserPanel /></PrivateRoute>}></Route>
                <Route path='/tags' element={<PrivateRoute><SelectTags></SelectTags></PrivateRoute>}></Route>
                <Route path='/edit-tags/:id' element={<PrivateRoute><TagsEdition></TagsEdition></PrivateRoute>}></Route>
                <Route path='/unathorized' element={<Unathorized></Unathorized>}></Route>
              </Route>
                {
                //Proteger esta ruta para comprobar que el usuario es admin
                }
              <Route element={<PrivateRoute><PrivateAdminRoute><AdminLayout /></PrivateAdminRoute></PrivateRoute>}>
                <Route path='/dashboard' element={<AdminDashBoard></AdminDashBoard>}></Route>
                <Route path='/admin/users' element={<UserManagement></UserManagement>}></Route>
                <Route path='/admin/user/:id' element={<UserDetailsAdmin></UserDetailsAdmin>}></Route>
                <Route path='/admin/posts' element={<PostManagement></PostManagement>}></Route>
                <Route path='/admin/post/:id' element={<PostDetailsAdmin></PostDetailsAdmin>}></Route>
                <Route path='/admin/comments' element={<CommentsManagement></CommentsManagement>}></Route>
                <Route path='/admin/tags' element={<TagsManagement></TagsManagement>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
          
        </PostProvider>
      </UserProvider>
    </>
  )
}

export default App
