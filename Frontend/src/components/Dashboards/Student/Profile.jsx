import React, { useEffect, useRef, useState } from "react";


const Profile = () => {

    const [showEditBtn, setShowEditBtn] = useState(true);
    const ref = useRef()
    const toggleShowEditBtn = () => {
        setShowEditBtn(!showEditBtn);
    };

    useEffect(() => {
        if (!showEditBtn) {
            ref.current?.focus()
        }
    }, [showEditBtn])

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
            <div className="container mx-auto p-6">
                {/* Heading */}
                {/* Instead of my show the student name fetched form the backend  */}
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-6 animate-pulse">
                    My Profile
                </h1>


                {/* Student Profile Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="https://t3.ftcdn.net/jpg/06/22/37/36/360_F_622373669_Fcf3wX7iKZB4A4zeDxEWfi7KsBpo6UFK.jpg"
                            alt="Student Avatar"
                            className="md:w-32 md:h-32 h-20 w-20 rounded-full mb-4 object-cover border-4 border-indigo-500 hover:scale-125 hover:transition-all duration-200 transition"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
                    </div>

                    {/* Form Section */}
                    <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="block text-gray-700 font-medium">Full Name</label>
                            <input
                                ref={ref}
                                value="John Doe"
                                disabled={showEditBtn === true}
                                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 ${showEditBtn ? "" : "focus"}`}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="text"
                                value="john.doe@example.com"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Phone</label>
                            <input
                                type="text"
                                value="9876543210"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Role</label>
                            <input
                                type="text"
                                value="Student"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Branch Name</label>
                            <input
                                type="text"
                                value="Computer Science"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Current Year</label>
                            <input
                                type="text"
                                value="Second Year"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Room Number</label>
                            <input
                                type="text"
                                value="202"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-600 font-medium">Hobbies</label>
                            <input
                            
                                type="text"
                                value="Reading, Coding, Football"
                                disabled={showEditBtn === true}
                                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
                            />
                        </div>
                    </form>

                    {/* Buttons Section */}
                    <div className="mt-6">

                        {showEditBtn ? <button
                            id="view-complaints-btn"
                            onClick={toggleShowEditBtn}
                            className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
                        >
                            Edit
                        </button> : <button
                            id="view-complaints-btn"
                            onClick={toggleShowEditBtn}
                            className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
                        >
                            Save
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
