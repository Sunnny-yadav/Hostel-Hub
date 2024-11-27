import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Login() {
  console.log("i am login")
  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handelLoginData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setloginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandelLogin = async (e) => {
    e.preventDefault();
    try {
      const login_Response = await fetch("http://localhost:8000/api/v1/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });

      const res = await login_Response.json();

      if(res.success){
  
        navigate("/StudentProfile");
      }else{
        alert("login unsuccessfull");
      }
      
    
    } catch (error) {
      console.log("Error in performing login::login.jsx")
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandelLogin} className="md:w-[290px] w-[250px] space-y-8 m-auto">
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
                value={loginData.email}
                onChange={handelLoginData}
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
                onChange={handelLoginData}
                value={loginData.password}
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
        <p className="text-center text-lg font-bold mb-4 hover:underline">New Student?</p>
        <button className="w-full py-4 font-semibold text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300">
          <Link to="/Login_signIn/SignIn">
            Sign In
          </Link>
        </button>
      </form>
    </>
  );
}

export default Login;
