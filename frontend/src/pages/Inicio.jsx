import React from 'react'
import WelcomeMessage from '../components/WelcomeMessage'
import BlurText from '../components/UI/BlurText';
import ScrollReveal from '../components/UI/ScrollReveal';
import SplashCursor from '../components/UI/SplashCursor';

const Inicio = () => {

  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


  return (
    <>
    <section className='bg-black h-screen text-center flex items-center py-5 mt-4'>
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

      <section className='bg-[#0f100f] h-screen text-center flex items-center justify-center rounded-t-[150px]'>
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

        </div>
        <div className='w-[40%]'>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
        </div>
      </section>
    </>
  )
}

export default Inicio