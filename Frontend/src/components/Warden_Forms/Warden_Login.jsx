import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import warden_Login from '../../assets/warden_Login.jpg'

function Warden_Login() {

  const [WardenLoginData, setWardenLoginData] = useState({
    email: "",
    password: ""
  });

  const handel_Warden_LoginData = (e) => {
    const { name, value } = e.target;
    setWardenLoginData({
      ...WardenLoginData,
      [name]: value
    });
  };

  const onSubmitHandelLogin = (e) => {
    e.preventDefault();
    console.log("submit successfully")
    setWardenLoginData({
      email: "",
      password: ""
    })
  }

  return (
    <>
      {/* container */}
      <div className=' flex justify-center items-center md:justify-around h-[100vh]   '>
        {/* image for login form  */}
        <div>
          <img
            src={warden_Login}
            className='hidden  sm:w-[350px] md:w-[500px] sm:block '
            alt="warden_login_image" />
        </div>

        {/* form for performing login to warden */}
        <div >
          <form onSubmit={onSubmitHandelLogin} className="sm:w-[270px] md:w-[280px] md:mr-10 w-[250px] space-y-8 ">
            <h1 className="text-4xl font-medium mb-8 text-gray-900">
              Welcome To Phcet Hostel
            </h1>

            {/* Form Fields */}
            <div className="space-y-7">
              {/* Email Field */}
              <div className="relative flex items-center border-b border-gray-400 pb-1">
                <div className="relative ml-2 w-full">
                  <span className="material-symbols-outlined absolute text-gray-400 top-2">
                    mail
                  </span>
                  <input
                    type="email"
                    name='email'
                    id='email'
                    value={WardenLoginData.email}
                    onChange={handel_Warden_LoginData}
                    placeholder="Email"
                    className="w-full placeholder:pl-5 h-full bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="relative flex items-center border-b border-gray-400 pb-1">
                <div className="relative ml-2 w-full">
                  <span className="material-symbols-outlined absolute text-gray-400 top-2">
                    lock
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    id='password'
                    onChange={handel_Warden_LoginData}
                    value={WardenLoginData.password}
                    className="w-full h-full placeholder:pl-5 bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                  />
                </div>
              </div>
            </div>
            {/* Login Button */}
            <button type='submit' className="w-full font-semibold py-4 text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300">
              Login
            </button>
            {/* Sign In Link */}
            <p className="text-center text-lg font-bold mb-4 hover:underline">Don't have an Account?</p>
            <button className="w-full py-4 font-semibold text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300">
              <Link to="/Warden_Login_SignIn/warden_signIn">
                Sign In
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Warden_Login