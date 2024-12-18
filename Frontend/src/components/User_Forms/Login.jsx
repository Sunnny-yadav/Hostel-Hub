import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/Login.jpg";
import { UserContext } from "../../ContextApi/userContext";

function Login() {
  const navigate = useNavigate();
  const { SetTokenInLocalStorage } = UserContext();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmitHandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const { data } = await response.json();
        SetTokenInLocalStorage(data.AccessToken);
        setLoginData({
          email: "",
          password: "",
        });
        (data.role_Value === "student") ? navigate("/student-dashboard") : navigate("/warden-dashboard");

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Main container */}
      <div className="flex  lg:flex-row justify-center items-center lg:gap-10 bg-blue-50 py-6 px-4 h-screen">
        {/* Image section */}
        <div className="hidden sm:block sm:w-[400px] md:w-[500px] lg:w-[600px]">
          <img src={loginImg} alt="Login" className="rounded-lg shadow-md" />
        </div>

        {/* Form section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <form onSubmit={onSubmitHandleLogin} className="space-y-8">
            <h1 className="text-4xl font-medium text-blue-600 text-center mb-8">
              Welcome to PHCET Hostel
            </h1>

            {/* Email field */}
            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={loginData.email}
                onChange={handleLoginData}
                required
                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                mail
              </span>
            </div>

            {/* Password field */}
            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={loginData.password}
                onChange={handleLoginData}
                required
                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                lock
              </span>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-4 font-semibold text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300"
            >
              Login
            </button>

            {/* Link to Registration */}
            <p className="text-center text-lg font-bold my-4">
              Don&apos;t have an account?
              <Link
                to="/Login_SignIn/"
                className="text-blue-600 hover:underline ml-2"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
