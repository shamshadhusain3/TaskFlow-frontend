import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { StyleButton } from '../ui/miniComponents/button/StyleButton';
import AuthForm from '../ui/AuthForm';
// import AuthFormMobile from '../ui/AuthFormMobile';

import AuthButtons from '../ui/miniComponents/button/AuthButtons';

function HeroSection() {
  const [isGetStarted, setIsGetStarted] = useState(false);
  const [isMobile, setisMobile] = useState(false)
  const authRef = useRef(null);
  window.addEventListener('resize',()=>{
    if(window.innerWidth >= 768){
      setisMobile(true)
    }
  })

  useEffect(() => {
    if (isGetStarted) {
      gsap.to(authRef.current, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        display: 'flex',
      });
    } else {
      gsap.to(authRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        ease: 'power3.in',
        display: 'none',
      });
    }
  }, [isGetStarted]);

  const showLogin = () => {
    setIsGetStarted(true);
   
  };

  const closeLogin = () => {
    setIsGetStarted(false);
  };

  return (
    <div className="h-auto w-full lg:mt-40 relative">
      <div className="flex flex-col md:py-16 md:mb-20 relative gap-6 p-6 mt-16 sm:mt-20 md:flex-row md:gap-3 items-center">
        <div className="sideImage md:hidden">
          <img src="images/sideImage.png" className="w-full img" alt="" />
        </div>
        <div className="heroContent  md:w-full flex flex-col gap-8 justify-center items-center md:justify-start md:items-start">
          <div className="flex flex-col md:justify-start md:items-start">
            <h1 className="text-[3rem] text-center font-bold text-black leading-[50px] tracking-tight md:text-start">
              A Task Management
            </h1>
            <h1 className="text-[3rem] text-center font-bold text-black leading-[50px] tracking-tight md:text-start">
              Solution for Businesses
            </h1>
          </div>
          <h3 className="text-[1.8rem] font-bold text-center text-black leading-[30px] tracking-tight md:text-start">
            Your all-in-one task management solution
          </h3>
          <p className="text-xl text-gray-400 text-center md:text-start">
            Simplify your workflow with TaskFlow. Manage tasks efficiently, collaborate with your team, and stay organized.
          </p>
          <StyleButton
            bg="blue"
            text="Get Started"
            hover="blue"
            btn-text='text-blue-500'
            border="border-['#0DA882']"
            onClick={showLogin}
          />
     

        </div>
        <div className="sideImage hidden md:block w-[375px] h-96">
          <img src="images/sideImage.png" className="w-full" alt="" />
        </div>
      </div>
      <div
        ref={authRef}
        className="Auth fixed top-0 left-0 w-full h-full  justify-center items-center opacity-0 scale-0 flex hidden z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl h-auto mx-4">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={closeLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         
          <AuthButtons/>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
