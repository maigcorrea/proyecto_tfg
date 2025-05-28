import React from 'react'
import Nav from './nav'
import ProfileButtons from './ProfileButtons'
import { useContext } from 'react'
import { UserContext } from '../../context/UserrContext'

const Header = () => {
  const { userSession } = useContext(UserContext);

  return (
    <>
      <div className='bg-emerald-100 flex w-full sticky top-0'>
        <Nav></Nav>
        {userSession.tipo === "admin" ? (
        null
      ) : <ProfileButtons></ProfileButtons>}
        

      </div>
    </>
  )
}

export default Header