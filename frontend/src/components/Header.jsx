import React from 'react'
import Nav from './Nav'
import ProfileButtons from './ProfileButtons'
import { useContext } from 'react'
import { UserContext } from '../../context/UserrContext'

const Header = () => {
  const { userSession } = useContext(UserContext);

  return (
    <>
        <Nav></Nav>
    </>
  )
}

export default Header