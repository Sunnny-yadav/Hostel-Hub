import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginBg from "../../assets/LoginBg.jpg";

function Warden_Login_SignIn() {
  return (
    <>
    <div
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Background Circles */}
      <div className="absolute w-52 h-52 rounded-full -top-28 -left-14 bg-gradient-to-b from-blue-500 to-transparent"></div>
      <div className="absolute w-52 h-52 rounded-full -bottom-24 -right-22 bg-gradient-to-b from-blue-500 to-transparent transform rotate-180"></div>

      {/* Main Form Container */}
        <Outlet/>
    </div>
    </>
  )
}

export default Warden_Login_SignIn