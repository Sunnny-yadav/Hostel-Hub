import React from 'react';
import { useNavigate } from 'react-router-dom';
import Indian_dishes from '../../../assets/dishes.webp';

function Meal_Poll() {
    const navigate = useNavigate();

    return (
        <>
            <div className="relative flex justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-200 min-h-screen overflow-hidden">
                {/* Main container with shadow */}
                <div className="container bg-white shadow-2xl mt-5 mb-5  xl:my-auto mx-5 p-10  rounded-3xl border border-gray-300 w-full max-w-4xl relative z-10">
                    {/* Bubble decoration placed inside the container on the bottom-right */}
                    <div className="absolute bottom-[-50px] right-[-100px] bg-blue-300 rounded-full w-32 h-32 md:w-64 md:h-64 opacity-40 animate-pulse"></div>

                    {/* Navbar */}
                    <div className="font-lobster font-bold text-4xl text-blue-600 text-center mb-10">
                        <nav>
                            <ul>
                                <li>Todays Meal Poll</li>
                            </ul>
                        </nav>
                    </div>

                    {/* Main content area */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <main className="w-full md:w-1/2 space-y-8">
                            {/* Title section */}
                            <div className="text-center md:text-left">
                                <span className="block font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight font-poppins">
                                    We Deliver Delicious
                                </span>
                                <span className="block font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight font-poppins">
                                    & Healthy Food
                                </span>
                                <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
                                    Vote for your favorite meal and enjoy a taste of home! Your choice matters in making today’s meal unforgettable.
                                </p>
                            </div>

                            {/* Poll container */}
                            <div className="bg-blue-50 rounded-3xl p-6 shadow-inner space-y-6">
                                <p className="font-semibold text-blue-600 text-lg sm:text-xl">
                                    Today's Poll: Choose Your Meal
                                </p>
                                {/* Example Poll Items */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-md space-y-2 sm:space-y-0">
                                    <span className="font-medium text-gray-700 text-center sm:text-left">Option 1: Paneer Butter Masala</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                                        Vote
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-md space-y-2 sm:space-y-0">
                                    <span className="font-medium text-gray-700 text-center sm:text-left">Option 2: Chicken Curry</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                                        Vote
                                    </button>
                                </div>
                            </div>
                        </main>

                        {/* Image container */}
                        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
                            <img
                                src={Indian_dishes}
                                alt="Indian dishes"
                                className="rounded-3xl shadow-md w-80 transform hover:scale-105 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Meal_Poll;
