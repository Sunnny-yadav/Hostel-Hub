import React, { useEffect, useState } from 'react';
import Indian_dishes from '../../../assets/dishes.webp';
import { useUserContext } from '../../../Context/userContext';
import { toast } from 'react-toastify';

function Meal_Poll() {
    const { Token, userData } = useUserContext();
    const [menuData, setMenuData] = useState({});
    const [isPollExpired, setIsPollExpired] = useState(false);

    useEffect(() => {
        async function getLatestMealPoll() {
            try {
                const response = await fetch("http://localhost:8000/api/v1/meals/get-recent-MealPoll", {
                    method: "GET",
                    headers: {
                        Authorization: Token
                    }
                });

                const responseData = await response.json();
                console.log(responseData)
                if (response.ok) {
                    setMenuData(responseData.data);
                } else {
                    toast.error(responseData.message);
                };
                checkPollExpiry(responseData?.data?.pollDeadline);

            } catch (error) {
                console.log("Error in getLatestmealPoll function useEffect", error);
            }
        }

        const checkPollExpiry = (deadline) => {
            const currentTime = new Date().getTime();
            const pollDeadline = new Date(deadline).getTime();

            if (currentTime > pollDeadline) {
                setIsPollExpired(true);
            }
        };

        getLatestMealPoll();
    }, []);

    const handleVote = async (menuId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/meals/${menuData._id}/${menuId}/vote-menu`, {
                method: "PATCH",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setMenuData(responseData.data);
                toast.success(responseData.message);
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.log("Error while raising a vote :: handleVote", error);
        }
    };

    return (
        <>
            <div className="relative flex justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-200 min-h-screen overflow-hidden">
                {/* Main container with shadow */}
                <div className="container bg-white shadow-2xl mt-5 mb-5 xl:my-auto mx-5 p-10 rounded-3xl border border-gray-300 w-full max-w-4xl relative z-10">
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
                                    {userData.fullName} {" "}We Deliver Delicious
                                </span>
                                <span className="block font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight font-poppins">
                                    & Healthy Food
                                </span>
                                <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
                                    Vote for your favorite meal and enjoy a taste of home! Your choice matters in making today’s meal unforgettable.
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-3xl p-6 shadow-inner space-y-6">
                                <p className="font-semibold text-blue-600 text-lg sm:text-xl text-center">
                                    Today's Poll: Choose Your Meal
                                </p>

                                {/* Poll Status and Deadline */}
                                <div className="text-center">
                                    <p className={`font-semibold text-lg ${menuData ? (menuData?.pollStatus === 'inactive' ? 'text-red-500' : 'text-green-500') : ''
                                        }`}>
                                        {Object.keys(menuData).length > 0 ?
                                            `Poll Status: ${menuData?.pollStatus === 'inactive' || isPollExpired === true ? 'Inactive' : 'Active'}`
                                            : 'No poll added'
                                        }
                                    </p>

                                    <p className="font-semibold text-gray-600 mt-2">
                                        Deadline: {menuData?.pollDeadline ? new Date(menuData?.pollDeadline).toLocaleString() : "N/A"}
                                    </p>
                                    {isPollExpired && (
                                        <p className="text-red-600 mt-2 font-semibold">Time Out: Poll has expired.</p>
                                    )}
                                </div>

                                {menuData?.meals?.length > 0 &&
                                    (() => {
                                        // Calculate total votes dynamically
                                        const totalVotes = menuData.meals.reduce((sum, menuObj) => sum + menuObj.count, 0);

                                        return menuData.meals.map((menuObj) => {
                                            // Calculate the proportional width of the bar
                                            const barWidth = totalVotes > 0 ? (menuObj.count / totalVotes) * 100 : 0;

                                            return (
                                                <div
                                                    key={menuObj.menu}
                                                    className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4 sm:gap-6"
                                                >
                                                    {/* Meal Name */}
                                                    <span className="font-medium text-gray-700 text-center sm:text-left flex-1">
                                                        {menuObj.menu}
                                                    </span>

                                                    {/* Voting Section */}
                                                    <div className="flex-1 sm:w-64">
                                                        <div className="relative bg-gray-200 rounded-full h-4">
                                                            <div
                                                                className="absolute top-0 left-0 bg-blue-600 h-4 rounded-full text-white text-xs flex items-center justify-center"
                                                                style={{ width: `${barWidth}%` }}
                                                            >
                                                                {menuObj.count} votes
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Vote Button */}
                                                    <button
                                                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300 flex-1 sm:flex-none ${menuData?.pollStatus === "inactive" || isPollExpired ? "hover:cursor-not-allowed" : ""}`}
                                                        onClick={() => handleVote(menuObj._id)}
                                                        disabled={menuData?.pollStatus === "inactive" || isPollExpired}
                                                    >
                                                        Vote
                                                    </button>
                                                </div>
                                            );
                                        });
                                    })()}
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
