import React from 'react'
import Nav from './nav'
import ProfileButtons from './ProfileButtons'

const Header = () => {
  return (
    <>
      <div className='bg-emerald-100 flex w-full sticky top-0'>
        <Nav></Nav>
        {<ProfileButtons></ProfileButtons>}
        

      </div>
    </>
  )
}

export default Header