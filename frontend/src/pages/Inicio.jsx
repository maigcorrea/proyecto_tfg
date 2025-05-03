import React from 'react'
import WelcomeMessage from '../components/WelcomeMessage'

const Inicio = () => {
  return (
    <>
    <section className='bg-black h-screen text-center flex items-center py-5 my-4'>
        <div className='bg-[url(../mp4/fondoMain.gif)] bg-cover flex items-center w-[100%] mx-4 h-[90%] my-4 rounded-2xl'>
          <h1 className='text-[75px] mx-auto'>TÍTULO DE LA PÁGINA</h1>
          <WelcomeMessage></WelcomeMessage>
        </div>
      </section>
    </>
  )
}

export default Inicio