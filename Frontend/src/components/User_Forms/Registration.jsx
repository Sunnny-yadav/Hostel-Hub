import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignIn from "../../assets/SignIn.jpg";
import { useUserContext } from "../../Context/userContext";
import { toast } from "react-toastify";
function Registration() {
    const { SetTokenInLocalStorage } = useUserContext()
    const [registrationData, setRegistrationData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        phone: "",
        gender: "",
        role: "",
        branchName: "",
        currentYear: "",
        roomNumber: "",
        hobbies: [],
    });

    const navigate = useNavigate();
    const additionalField = useRef(null);

    useEffect(() => {

        if (registrationData.role === "student") {
            move_Additional_Fields();
        }
    }, [registrationData.role]);

    // Scrolls to the additional fields
    function move_Additional_Fields() {
        console.log("Scrolling to additional fields...");
        if (additionalField.current) {
            additionalField.current.scrollBy({
                top: 250,
                behavior: "smooth",
            });
        }
    }

    const handleRegistrationData = (e) => {
        const { name, value, files } = e.target;
        setRegistrationData((prev) => ({
            ...prev,
            [name]: name === "avatar" ? files[0] : value
        }));
    };

    const handleHobbiesChange = (e) => {
        const { value } = e.target;
        setRegistrationData((prev) => ({
            ...prev,
            hobbies: value.split(","),
        }));

    };

 
    const onSubmitRegistrationData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const Data in registrationData) {
            formData.append(Data, registrationData[Data])
        }

        try {
            const respose = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                body: formData
            })
            const responseValue = await respose.json();

            if (respose.ok) {
                SetTokenInLocalStorage(responseValue.data.AccessToken);
                setRegistrationData({
                    fullName: "",
                    email: "",
                    password: "",
                    avatar: "",
                    phone: "",
                    gender: "",
                    role: "",
                    branchName: "",
                    currentYear: "",
                    roomNumber: "",
                    hobbies: [],
                });
                (responseValue.data.role_Value === "student") ? navigate("/student-dashboard") : navigate("/warden-dashboard");
                toast.success(responseValue.message)

            } else {
                toast.error(responseValue.message)
            }

        } catch (error) {
            console.error(error)

        }

    };

    return (
        <>
            <div className="flex justify-center items-center md:gap-9 md:justify-around bg-blue-50 py-3 px-4">
                {/* Image */}
                <div className="hidden sm:block sm:w-[400px] md:w-[500px] lg:w-[600px]">
                    <img src={SignIn} alt="SignIn" className="rounded-lg shadow-md" />
                </div>

                {/* Form Container */}
                <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-lg">
                    <form onSubmit={onSubmitRegistrationData} className="space-y-8">
                        <h1 className="text-4xl font-medium text-blue-600 text-center mb-8">
                            Create Your Account
                        </h1>

                        {/* Form Fields Container with Fixed Height and Scroll */}
                        <div className="space-y-4 h-[440px] overflow-y-auto" ref={additionalField}>
                            {/* Name Field */}
                            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                <input

                                    autoComplete="off"
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    name="fullName"
                                    value={registrationData.fullName}
                                    onChange={handleRegistrationData}
                                    className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                    account_circle
                                </span>
                            </div>

                            {/* Email Field */}
                            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                <input
                                    autoComplete="off"

                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    value={registrationData.email}
                                    onChange={handleRegistrationData}
                                    className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                    mail
                                </span>
                            </div>

                            {/* Profile Image Field */}
                            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                <input
                                    autoComplete="off"
                                    required
                                    type="file"
                                    name="avatar"
                                    onChange={handleRegistrationData}
                                    className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                    image
                                </span>
                            </div>

                            {/* Password Field */}
                            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                <input
                                    autoComplete="off"

                                    type="password"
                                    placeholder="Enter Your Password"
                                    name="password"
                                    value={registrationData.password}
                                    onChange={handleRegistrationData}
                                    className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                    lock
                                </span>
                            </div>

                            {/* Phone Field */}
                            <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                <input
                                    autoComplete="off"

                                    type="tel"
                                    name="phone"
                                    placeholder="Enter Your Phone Number"
                                    pattern="[0-9]{10}"
                                    value={registrationData.phone}
                                    onChange={handleRegistrationData}
                                    className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                    call
                                </span>
                            </div>

                            {/* Gender Field */}
                            <div className="flex items-center gap-6">
                                <span className="font-medium text-blue-600">Gender:</span>
                                <div className="flex gap-4">
                                    <label className="text-gray-500">
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            name="gender"
                                            value="M"
                                            onChange={handleRegistrationData}
                                            checked={registrationData.gender === "M"}
                                        />{" "}
                                        Male
                                    </label>
                                    <label className="text-gray-500">
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            name="gender"
                                            value="F"
                                            onChange={handleRegistrationData}
                                            checked={registrationData.gender === "F"}
                                        />{" "}
                                        Female
                                    </label>
                                    <label className="text-gray-500">
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            name="gender"
                                            value="O"
                                            onChange={handleRegistrationData}
                                            checked={registrationData.gender === "O"}
                                        />{" "}
                                        Other
                                    </label>
                                </div>
                            </div>

                            {/* Role Field */}
                            <div className="flex items-center gap-6">
                                <span className="font-medium text-blue-600">Role:</span>
                                <div className="flex gap-4">
                                    <label className="text-gray-500">
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            name="role"
                                            value="student"
                                            onChange={handleRegistrationData}
                                            checked={registrationData.role === "student"}
                                        />{" "}
                                        Student
                                    </label>
                                    <label className="text-gray-500">
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            name="role"
                                            value="warden"
                                            onChange={handleRegistrationData}
                                            checked={registrationData.role === "warden"}
                                        />{" "}
                                        Warden
                                    </label>
                                </div>
                            </div>

                            {/* Additional Fields for Student */}
                            {registrationData.role === "student" && (
                                <div >
                                    <div className="space-y-4">
                                        <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                            {/* <input
                                                autoComplete="off"
                                                type="text"
                                                name="branchName"
                                                placeholder="Branch Name"
                                                value={registrationData.branchName}
                                                onChange={handleRegistrationData}
                                                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                            /> */}
                                            <select
                                                onChange={handleRegistrationData}
                                                value={registrationData.branchName}
                                                name="branchName"
                                                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                            
                                            >
                                                <option value="">Select Your branch</option>
                                                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                                                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                                                <option value="Electrical Engineering">Electrical Engineering</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Information Technology">Information Technology</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                                business
                                            </span>
                                        </div>

                                        <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                            <select 
                                                name="currentYear"
                                                value={registrationData.currentYear}
                                                onChange={handleRegistrationData}
                                                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                                >
                                                    <option value="">Select Year</option>
                                              <option value="FE">FE</option>
                                              <option value="SE">SE</option>
                                              <option value="TE">TE</option>
                                              <option value="BE">BE</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                                calendar_today
                                            </span>
                                        </div>

                                        <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={registrationData.roomNumber}
                                                onChange={handleRegistrationData}
                                                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                            />
                                            <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                                home
                                            </span>
                                        </div>

                                        <div className="relative flex items-center border-b-2 border-gray-300 pb-2">
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                name="hobbies"
                                                placeholder="Hobbies (comma-separated)"
                                                value={registrationData.hobbies.join(",")}
                                                onChange={handleHobbiesChange}
                                                className="w-full py-2 pl-12 text-lg text-blue-600 focus:outline-none bg-transparent placeholder:text-gray-500"
                                            />
                                            <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
                                                emoji_events
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="btn">
                            {/* Submit Button */}
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-900 hover:bg-blue-700 rounded-lg transition-all duration-300"
                                >
                                    Register
                                </button>
                            </div>

                            {/* Back to Login */}
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-500">
                                    Already have an account?{" "}
                                    <Link
                                        to="/Login_SignIn/login"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Registration;
