import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import featurebg from '../../assets/3.jpeg'

function Features() {
  return (
    <div className=" w-[100vw] h-[100vh]  bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${featurebg})` }}>
      <div className="flex justify-end items-center mr-4">
       <Link to='/features/TermsPage'>
       <button class="bg-blue-500 mt-3 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-end animate-scale-pulse" >
          Terms & conditions
        </button>
       </Link>
      </div>
      <div className="flex items-center flex-col relative">
        <h1 className="text-orange-700 text-3xl font-bold font-serif hover:underline transition duration-700 animate-pulse hover:animate-none hover:text-orange-800 hover:scale-110 hover:rotate-3 mt-4">
          Our Services
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 justify-center ">
        <div className="flex justify-center items-center">
          <Card />
        </div>
        <div className="flex justify-center items-center">
          <Card />
        </div>
        <div className="flex justify-center items-center">
          <Card />
        </div>
        <div className="flex justify-center items-center">
          <Card />
        </div>
        <div className="flex justify-center items-center">
          <Card />
        </div>
        <div className="flex justify-center items-center">
          <Card />
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default Features;
