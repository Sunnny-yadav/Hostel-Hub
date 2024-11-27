import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SignIn() {
    const [RegistrationData, setRegistrationData] = useState({
        fullName: "",
        branchName: "",
        currentYear: "",
        email: "",
        avatar: null,
        password: ""
    });

    const navigate = useNavigate();

    const handelRegistrationData = (e) => {
        const { name, value, files } = e.target;
        setRegistrationData((prev) => (
            {
                ...prev,
                [name]: name === "avatar" ? files[0] : value
            }
        ))
    };

    const onSubmitRegistrationData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", RegistrationData.fullName);
        formData.append("branchName", RegistrationData.branchName);
        formData.append("currentYear", RegistrationData.currentYear);
        formData.append("email", RegistrationData.email);
        formData.append("password", RegistrationData.password);
        formData.append("avatar", RegistrationData.avatar); // Add file input

        try {
            const response = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                body: formData, // Use FormData instead of JSON
            });

            if (response.success) {
                setRegistrationData({
                    fullName: "",
                    branchName: "",
                    currentYear: "",
                    email: "",
                    avatar: null,
                    password: ""
                })
            };
            navigate('/Login_signIn')
        } catch (error) {
            console.log("Error:", error.message);
        }
    };


    const BackToLogin = () => {
        navigate('/Login_signIn')
    }
    return (
        <>
            <form onSubmit={onSubmitRegistrationData} className="w-[290px] space-y-8 m-auto">
                <h1 className="text-4xl font-medium mb-8 text-gray-900">
                    New Student Registration
                </h1>

                {/* Form Fields */}
                <div className="space-y-7">

                    {/* Name field  */}
                    <div className="relative flex items-center border-b border-gray-400 pb-1">
                        <div className="relative ml-2 w-full">
                            <span className="material-symbols-outlined absolute text-gray-400 top-2">
                                account_circle
                            </span>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name='fullName'
                                id='fullName'
                                value={RegistrationData.fullName}
                                onChange={handelRegistrationData}
                                className="w-full placeholder:pl-5 h-full bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* branchName filed  */}
                    <div className="relative flex items-center border-b border-gray-400 pb-1">
                        <div className="relative ml-2 w-full">
                            <span className="material-symbols-outlined absolute text-gray-400 top-2">
                                school
                            </span>
                            <input
                                type="text"
                                placeholder="Enter Your branchName"
                                name='branchName'
                                id='branchName'
                                value={RegistrationData.branchName}
                                onChange={handelRegistrationData}
                                className="w-full placeholder:pl-5 h-full bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Year field  */}
                    <div className="relative flex items-center border-b border-gray-400 pb-1">
                        <div className="relative ml-2 w-full">
                            <span className="material-symbols-outlined absolute text-gray-400 top-2">
                                calendar_month
                            </span>
                            <input
                                type="number"
                                placeholder="Current Year"
                                name='currentYear'
                                id='currentYear'
                                value={RegistrationData.currentYear}
                                onChange={handelRegistrationData}
                                className="w-full placeholder:pl-5 h-full bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>
                    {/* Email Field */}
                    <div className="relative flex items-center border-b border-gray-400 pb-1">
                        <div className="relative ml-2 w-full">
                            <span className="material-symbols-outlined absolute text-gray-400 top-2">
                                mail
                            </span>
                            <input
                                type="email"
                                placeholder="Email"
                                name='email'
                                id='email'
                                value={RegistrationData.email}
                                onChange={handelRegistrationData}
                                className="w-full placeholder:pl-5 h-full bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* user profile photo  */}
                    <div className="relative flex items-center border-b border-gray-400 pb-1">
                        <div className="relative ml-2 w-full">
                            <span className="material-symbols-outlined absolute text-gray-400 top-2">
                                image
                            </span>
                            <input
                                required
                                type='file'
                                name='avatar'
                                id='avatar'
                                onChange={handelRegistrationData}
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
                                value={RegistrationData.password}
                                onChange={handelRegistrationData}
                                className="w-full h-full placeholder:pl-5 bg-transparent border-none outline-none p-2 pl-8 text-lg text-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>
                </div>


                <div className='flex flex-col sm:flex-col justify-around items-center sm:items-stretch'>
                    {/* Register Button */}
                    <div className="w-full lg:w-full"> {/* Full width on all screens */}
                        <button
                            className="w-full font-semibold lg:py-2 md:py-1 py-1 px-3 text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300"
                        >
                            Register
                        </button>
                    </div>

                    {/* Back to login */}
                    <div className='flex flex-col justify-center items-center w-full lg:mt-4 mt-2'> {/* Flex column on small screens and full width */}
                        <p className="text-center font-bold lg:text-lg md:text-sm hidden lg:block hover:underline">Already have an Account?</p>
                        <button
                            onClick={BackToLogin}
                            className="w-full font-semibold lg:py-2 md:py-1 py-1 px-3 text-lg bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300"
                        >
                            Back To Login
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignIn