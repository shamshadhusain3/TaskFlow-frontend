import React from 'react'

function Header({navTitle}) {
  return (
    <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 relative sm:hidden">
    <div className="flex items-center justify-between h-full px-6">
      <div className="text-white flex items-center font-bold text-2xl">
        <div className="logo">
          <img src="images/logo.png" alt="Logo" />
        </div>
        <div className="logoText">{navTitle}</div>
      </div>
    </div>
  </div>
  )
}

export default Header
