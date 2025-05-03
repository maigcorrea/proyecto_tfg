import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import Foro from './pages/Foro'
import Comunidades from './pages/Comunidades'
import Noticias from './pages/Noticias'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PrivateRoute from './components/PrivateRoute'
import UserPanel from './pages/UserPanel'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Inicio/>}></Route>
            <Route path='foro' element={<PrivateRoute><Foro/></PrivateRoute>}></Route>
            <Route path='comunidades' element={<PrivateRoute><Comunidades></Comunidades></PrivateRoute>}></Route>
            <Route path='/noticias' element={<PrivateRoute><Noticias></Noticias></PrivateRoute>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Registro></Registro>}></Route>
            <Route path='/my-profile' element={<PrivateRoute><UserPanel /></PrivateRoute>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
