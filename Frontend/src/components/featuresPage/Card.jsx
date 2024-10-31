import React from 'react';
import Designer from '../../assets/Designer.png';

function Card() {
  return (
    <div className='border-gray-400 border-[1px] flex gap-4 w-fit  bg-[#E5E7EB] shadow-xl rounded-2xl p-2 mt-2 justify-center items-center sm:flex-col'>
      <div className='img sm:'>
        <img src={Designer} width={90} className='rounded-full border-2 border-[#9CA3AF]' alt="Designer" />
      </div>
      <div className='flex flex-col justify-center sm:items-center'>
        <div>
          <h2 className='text-xl font-bold text-[#1F2937]'>Raise Gravience</h2>
        </div>
        <div>
          <p className='text-[#4B5563] mt-1 w-[300px] md:w-[250px]'>
            Easily raise and track complaints with our streamlined system for prompt resolution and improved service.
          </p>
        </div>
      </div>
    </div>


  );
}

export default Card;
