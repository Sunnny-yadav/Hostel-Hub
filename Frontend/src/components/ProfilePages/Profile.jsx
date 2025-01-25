import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../Context/userContext";
import { toast } from "react-toastify";

const Profile = () => {
    const [showEditBtn, setShowEditBtn] = useState(true);
    const { userData, Token, setuserData } = useUserContext();
    const ref = useRef();
    const [updatedData, setupdatedData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        role: "",
        branchName: "",
        currentYear: "",
        roomNumber: "",
        hobbies: [],
    });

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setupdatedData({
                fullName: userData?.fullName,
                email: userData?.email,
                phone: userData.phone,
                gender: userData.gender,
                role: userData.role,
                branchName: userData.branchName,
                currentYear: userData.currentYear,
                roomNumber: userData.roomNumber,
                hobbies: userData.hobbies,
            });
        }
    }, [userData]);

    const modifyUserData = (e) => {
        const { name, value } = e.target;
        setupdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const modifyUserHobbies = (e) => {
        const { value } = e.target;
        setupdatedData((prev) => ({
            ...prev,
            hobbies: value.toLowerCase().split(","),
        }));
    };

    const toggleShowEditBtn = () => {
        setShowEditBtn(!showEditBtn);
    };

    const Submit_And_toggleShowEditBtn = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/users/update-profile",
                {
                    method: "PATCH",
                    headers: {
                        Authorization: Token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                setuserData(responseData.data);
                setShowEditBtn(!showEditBtn);
                toast.success("Profile Modified");
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.log("Error::submit_And_toggleShowEditBtn::", error);
        }
    };

    useEffect(() => {
        if (!showEditBtn) {
            ref.current?.focus();
        }
    }, [showEditBtn]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);

            try {
                const response = await fetch(
                    "http://localhost:8000/api/v1/users/update-profileImg",
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: Token,
                        },
                        body: formData,
                    }
                );

                const responseData = await response.json();

                if (response.ok) {
                    setuserData((prev) => ({
                        ...prev,
                        avatar: responseData.data.avatar,
                    }));
                    toast.success("Profile image updated successfully!");
                } else {
                    toast.error(responseData.message);
                }
            } catch (error) {
                console.log("Error::handleImageUpload::", error);
                toast.error("Error updating profile image");
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
            <div className="container mx-auto p-6">
                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-6 animate-pulse">
                    My Profile
                </h1>

                {/* Student Profile Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={userData.avatar}
                            alt="Student Avatar"
                            className="md:w-32 md:h-32 h-20 w-20 rounded-full mb-4 object-cover border-4 border-indigo-500 hover:scale-125 hover:transition-all duration-200 transition"
                        />
                        <label
                            htmlFor="profile-image-upload"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 cursor-pointer"
                        >
                            Change Profile Image
                        </label>
                        <input
                            id="profile-image-upload"
                            type="file"
                            
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Student Profile
                        </h2>
                    </div>

                    {/* Form Section */}
                    <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Full Name
                            </label>
                            <input
                                ref={ref}
                                name="fullName"
                                value={updatedData.fullName}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 ${showEditBtn ? "" : "focus"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                name="email"
                                type="text"
                                value={updatedData.email}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">
                                Phone
                            </label>
                            <input
                                name="phone"
                                type="text"
                                value={updatedData.phone}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div
                            className={`${userData?.role === "warden" ? "hidden" : "block"
                                }`}
                        >
                            <label className="block text-gray-700 font-medium">
                                Branch Name
                            </label>
                            <input
                                name="branchName"
                                type="text"
                                value={updatedData.branchName}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div
                            className={`${userData?.role === "warden" ? "hidden" : "block"
                                }`}
                        >
                            <label className="block text-gray-700 font-medium">
                                Current Year
                            </label>
                            <input
                                name="currentYear"
                                type="text"
                                value={updatedData.currentYear}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div
                            className={`${userData?.role === "warden" ? "hidden" : "block"
                                }`}
                        >
                            <label className="block text-gray-700 font-medium">
                                Room Number
                            </label>
                            <input
                                name="roomNumber"
                                type="text"
                                value={updatedData.roomNumber}
                                disabled={showEditBtn === true}
                                onChange={modifyUserData}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div
                            className={`col-span-full ${userData?.role === "warden" ? "hidden" : "block"
                                }`}
                        >
                            <label className="block text-gray-600 font-medium">
                                Hobbies
                            </label>
                            <input
                                name="hobbies"
                                type="text"
                                value={updatedData.hobbies}
                                disabled={showEditBtn === true}
                                onChange={modifyUserHobbies}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>
                    </form>

                    {/* Buttons Section */}
                    <div className="mt-6">
                        {showEditBtn ? (
                            <button
                                id="view-complaints-btn"
                                onClick={toggleShowEditBtn}
                                className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <button
                                    id="view-complaints-btn"
                                    onClick={Submit_And_toggleShowEditBtn}
                                    className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
                                >
                                    Save
                                </button>
                                <span
                                    onClick={toggleShowEditBtn}
                                    className="text-red-500 font-bold text-lg bg-gray-200 p-2 pt-1 pb-1 rounded-lg  ml-2 cursor-pointer transition-transform transform hover:scale-110 hover:bg-red-200"
                                >
                                    &#x2715;
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
