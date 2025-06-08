import React, { useEffect, useState } from 'react'
import WelcomeMessage from '../components/WelcomeMessage'
import BlurText from '../components/UI/BlurText';
import ScrollReveal from '../components/UI/ScrollReveal';
import SplashCursor from '../components/UI/SplashCursor';
import GridMotion from '../components/UI/GridMotion';

const Inicio = () => {


  const items = [
  '/externalResources/pattern.jpg',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingFamily.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingFamily.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/adnImg.jpg',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingFamily.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  '/externalResources/smilingWoman.png',
  // Add more items as needed
];



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
    <section className='bg-white h-screen text-center'>
      <GridMotion items={items} gradientColor="black" />
        <div className="absolute bottom-50 bg-gradient-to-br z-10">
          <h1 className=" bg-black/50 text-center text-white px-6 pl-[20px] font-bold sm:text-[60px] text-[150px]">Singular Link</h1>
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

      <section className="flex flex-col md:flex-row items-center justify-center w-full min-h-[400px] my-20 px-4 md:px-16">
        {/* Imagen con recorte personalizado */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end mb-8 md:mb-0">
          <div className="relative rounded-3xl" style={{
            width: '100%',
            maxWidth: '500px',
            height: '320px',
            clipPath: 'polygon(35% 26%, 35% 0%, 97% 0%, 96% 69%, 70% 69%, 70% 91%, 1% 91%, 1% 26%)',
            WebkitClipPath: 'polygon(35% 26%, 35% 0%, 97% 0%, 96% 69%, 70% 69%, 70% 91%, 1% 91%, 1% 26%)'
          }}>
            <img 
              src={('../../public/mp4/dna.gif')} 
              alt="" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Contenido */}
        <div className="md:w-1/2 w-full md:pl-12 flex flex-col justify-center">
          <span className="text-primary-500 text-sm font-semibold mb-2">¿Por qué unirte?</span>
          <h2 className="text-2xl md:text-3xl font-light italic mb-2">SingularLink, <span className="not-italic">la red social que</span></h2>
          <h3 className="text-2xl md:text-3xl font-black mb-4">da visibilidad <span className="font-light ">a realidades</span> <span className="font-black">poco conocidas</span></h3>
          <ul className="text-gray-700 text-sm md:text-base mb-4 space-y-2">
            <li className="flex items-start"><span className="text-black mr-2 mt-1">◆</span> Conectar con personas que viven situaciones similares</li>
            <li className="flex items-start"><span className="text-black mr-2 mt-1">◆</span> Compartir tu historia, tus avances y tus días difíciles.</li>
            <li className="flex items-start"><span className="text-black mr-2 mt-1">◆</span> Sabemos lo delicado que es hablar de salud. Por eso tu privacidad es prioridad absoluta.</li>
          </ul>
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
              ¿Quieres conocernos más?
            </h2>
            <div className="flex gap-8">
              <a
                href="#write"
                className="flex items-center gap-3 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium hover:scale-105 transform"
              >
                Sobre nosotros
              </a>
              <a
                href="#call"
                className="flex items-center gap-3 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium hover:scale-105 transform"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inicio