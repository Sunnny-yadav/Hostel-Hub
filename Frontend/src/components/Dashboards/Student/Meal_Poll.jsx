import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Thumbs_up from '../../../assets/thumbs-up.png';
import Indian_dishes from '../../../assets/dishes.webp';
import { useDispatch, useSelector } from 'react-redux';
import { IncreaseCount ,loaditems } from '../../../Redux/slices/MealSlice.js'

function Meal_Poll() {
    // const [Count, setCount] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FoodItems = useSelector((state) => state.Meal.FoodArray);
    const [ActivateAnimation, setActivateAnimation] = useState(false);
    console.log(FoodItems);


    const Go_To_Profile = () => {
        navigate('/StudentProfile');
    }
    
    useEffect(()=>{
        const getitems = JSON.parse(localStorage.getItem("items"));
        if(getitems){
            dispatch(loaditems(getitems));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("items",JSON.stringify(FoodItems))
    },[FoodItems]);
    
    const increaseCount = (id)=>{
        console.log(id);
        dispatch(IncreaseCount(id))

        // setActivateAnimation(true);

        // setTimeout(() => {
        //     setActivateAnimation(false);
        // }, 2000);
    }

    return (
        <>
            <div className='relative flex justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-200 min-h-screen overflow-hidden'>

                {/* Main container with shadow */}
                <div className="container bg-white shadow-2xl mt-24 mx-5 p-10 pb-14 rounded-3xl border border-gray-300 w-full max-w-4xl relative z-10">

                    {/* Back Button */}
                    <div className='absolute top-5 right-5'>
                        <button
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold font-serif text-white py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none"
                            onClick={Go_To_Profile}
                        >
                            Back
                        </button>
                    </div>

                    {/* Bubble decoration placed inside the container on the bottom-right */}
                    <div className='absolute bottom-[-50px] right-[-100px] bg-blue-300 rounded-full w-32 h-32 md:w-64 md:h-64 opacity-40 animate-pulse'></div>

                    {/* Navbar */}
                    <div className='font-lobster font-bold text-4xl text-blue-600 text-center mb-10'>
                        <nav>
                            <ul>
                                <li>Todays Meal Poll</li>
                            </ul>
                        </nav>
                    </div>

                    {/* Main content area */}
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <main className='w-full md:w-1/2 space-y-8'>
                            {/* Title section */}
                            <div className='text-center md:text-left'>
                                <span className='block font-bold text-4xl text-gray-900 leading-tight font-poppins'>
                                    We Deliver Delicious
                                </span>
                                <span className='block font-bold text-4xl text-gray-900 leading-tight font-poppins'>
                                    & Healthy Food
                                </span>
                            </div>

                            {/* Poll container */}
                            <div className='bg-blue-50 rounded-3xl p-6 shadow-inner space-y-6'>
                                {/* Static Poll Item (You will make this dynamic) */}
                                {
                                    FoodItems.map((item) => (
                                        <div key={item.id} className='flex justify-between items-center mb-6'>
                                            <label className='font-medium text-lg mr-4 text-gray-700 font-poppins' htmlFor={item.option}>
                                                {item.option || "Unnamed"}
                                            </label>
                                            <input
                                                type="range"
                                                name={item.option}
                                                id={item.option}
                                                value={item.count}
                                                
                                                className='w-1/2 mx-4 accent-blue-500 hover:accent-blue-600'
                                                max={10}
                                                min={0}
                                            />
                                            <div className='text-xl font-semibold font-serif'>
                                                {item.count !== undefined ? item.count : 0}
                                            </div>
                                            <button
                                            onClick={()=>increaseCount(item.id)}
                                            >
                                                <img
                                                    src={Thumbs_up}
                                                    width={45}
                                                    alt="thumbs up icon"
                                                    className={`transition-transform transform hover:cursor-pointer hover:scale-110 duration-300 ease-in-out ${ActivateAnimation ? "animate-bounce-once" : ""}`}
                                                />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </main>

                        {/* Image container */}
                        <div className='w-full md:w-1/2 flex justify-center mt-8 md:mt-0'>
                            <img
                                src={Indian_dishes}
                                alt="Indian dishes"
                                className='rounded-3xl shadow-md w-80 transform hover:scale-105 transition duration-300 ease-in-out' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Meal_Poll;
