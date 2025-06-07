import React, { useEffect, useState } from 'react'
import WelcomeMessage from '../components/WelcomeMessage'
import BlurText from '../components/UI/BlurText';
import ScrollReveal from '../components/UI/ScrollReveal';
import SplashCursor from '../components/UI/SplashCursor';

const Inicio = () => {
  const [scale, setScale] = useState(0.8); // escala inicial
  const [opacity, setOpacity] = useState(0.4)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const targetSection = document.getElementById('grow-section')
      if (!targetSection) return;

      const sectionTop = targetSection.offsetTop
      const windowHeight = window.innerHeight

      // distancia desde el inicio hasta la sección
      const distance = scrollY + windowHeight - sectionTop +500

      
      const newScale = Math.min(1, Math.max(0.8, distance / 900))
      setScale(newScale)

      
      const newOpacity = Math.min(1, Math.max(0.4, distance / 900))
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


  return (
    <>
    <section className='bg-white h-screen text-center flex items-center py-5 mt-4'>
        <div className='bg-[#333f4f] bg-cover flex items-center w-[100%] mx-4 h-[90%] my-4 rounded-2xl'>
          <BlurText
            text="SingularLink"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[75px] mx-auto"
          />
          {/*<WelcomeMessage></WelcomeMessage>*/}
        </div>
      </section>

      <section id="grow-section" className='bg-[#0f100f] h-screen text-center flex items-center justify-center rounded-t-[150px]' style={{ transform: `scale(${scale})`, transformOrigin: 'center'}}>
        <div className=' w-[80%]'>
          <ScrollReveal
            baseOpacity={1}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            Una comunidad real para quienes enfrentan lo 
            extraordinario
          </ScrollReveal>
        </div>
      </section>


      <section className='flex align-center items-center'>
        
        <div className='w-[60%]'>
      <p>alahaoansndednewld</p>
        </div>
        <div className='w-[40%]'>
          <img src="../../public/externalResources/adnImg.jpg" alt="" />
        </div>
      </section>


      <section className="flex items-center justify-center min-h-[500px] w-full my-16">
        <div className="relative w-[90vw] max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
          {/* Fondo con imagen y gradiente superior */}
          <div className="absolute inset-0 bg-[url('../../public/externalResources/adnImg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center justify-center h-[500px] text-white px-8">
            <h2 className="text-3xl md:text-5xl font-light mb-12 drop-shadow-lg text-center leading-tight">
              Vous avez une question ou un projet ?
            </h2>
            <div className="flex gap-8">
              <a
                href="#write"
                className="flex items-center gap-3 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium hover:scale-105 transform"
              >
                <span className="text-green-400 text-xl">&#10003;</span>
                NOUS ÉCRIRE
              </a>
              <a
                href="#call"
                className="flex items-center gap-3 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium hover:scale-105 transform"
              >
                <span className="text-green-400 text-xl">&#10003;</span>
                NOUS APPELER
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inicio