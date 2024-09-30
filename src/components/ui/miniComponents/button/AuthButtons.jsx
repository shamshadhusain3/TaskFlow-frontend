import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useNavigate } from 'react-router-dom'

export default function AuthButtons() {
  const [isLogin, setIsLogin] = useState(true)
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const loginRef = useRef(null)
  const signupRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    gsap.to(bgRef.current, {
      x: isLogin ? '0%' : '100%',
      duration: 0.5,
      ease: 'power2.inOut',
    })

    gsap.to(loginRef.current, {
      opacity: isLogin ? 1 : 0.5,
      scale: isLogin ? 1.1 : 1,
      duration: 0.5,
      ease: 'power2.inOut',
    })

    gsap.to(signupRef.current, {
      opacity: isLogin ? 0.5 : 1,
      scale: isLogin ? 1 : 1.1,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }, [isLogin])

  const handleToggle = (mode) => {
    setIsLogin(mode === 'login')
  }

  const handleNavigation = () => {
    navigate(isLogin ? '/auth' : '/auth')
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg justify-center  bg-light-blue-gradient">
      <div
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-lg p-1 w-64 mb-8"
      >
        <div
          ref={bgRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-primary rounded-md transition-all duration-500 ease-in-out"
        ></div>
        <div className="relative flex">
          <button
            ref={loginRef}
            onClick={() => handleToggle('login')}
            className="flex-1 py-2 text-sm font-medium text-center transition-all duration-500 ease-in-out z-10"
          >
            Login
          </button>
          <button
            ref={signupRef}
            onClick={() => handleToggle('signup')}
            className="flex-1 py-2 text-sm font-medium text-center transition-all duration-500 ease-in-out z-10"
          >
            Sign Up
          </button>
        </div>
      </div>
      <button
        onClick={handleNavigation}
        className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
      >
        {isLogin ? "Go to Login" : "Go to Sign Up"}
      </button>
      <div className="mt-4 text-white text-center">
        <p>Current mode: {isLogin ? 'Login' : 'Sign Up'}</p>
        <p>
          <Link to="/auth" className="underline">Login Page</Link> | <Link to="/auth" className="underline">Sign Up Page</Link>
        </p>
      </div>
    </div>
  )
}