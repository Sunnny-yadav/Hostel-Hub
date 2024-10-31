import React from "react";
import login from "../../assets/login.png";
import LoginBg from "../../assets/LoginBg.jpg";
import { Outlet } from "react-router-dom";

function Login_signIn() {
  return (
    <div
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Background Circles */}
      <div className="absolute w-52 h-52 rounded-full -top-28 -left-14 bg-gradient-to-b from-blue-500 to-transparent"></div>
      <div className="absolute w-52 h-52 rounded-full -bottom-24 -right-22 bg-gradient-to-b from-blue-500 to-transparent transform rotate-180"></div>

      {/* Main Form Container */}
      <div className="sm:grid sm:items-center h-screen px-4 sm:ml-[300px] md:ml-[450px] lg:ml-[900px]">
        <img src={login} alt="" className="sm:absolute sm:left-[45px] md:left-[70px] md:w-[400px] lg:w-[700px] hidden sm:block sm:w-[300px]" />
        <Outlet/>
       
      </div>
    </div>
  );
}

export default Login_signIn;
