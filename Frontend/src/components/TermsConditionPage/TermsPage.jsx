import React from 'react'
import Rulesbg from '../../assets/1.jpeg'
import preview from '../../assets/TermLogo.jpg'
import Rules from './Rules'
import UsersBtn from './UsersBtn'

function TermsPage() {

    return (
        <>
            <div  className=" w-[100vw] h-[100vh]  bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${Rulesbg})` }}>
                <div className="flex justify-end items-center mr-4 relative">
                    <UsersBtn/>
                </div>
                <div className=" p-3 sm:text-center">
                    <h1 className="text-purple-600  text-3xl font-bold font-serif hover:underline transition duration-700 animate-pulse hover:animate-none hover:text-purple-700 hover:scale-110  mt-4">
                        Terms & conditions
                    </h1>
                </div>
                <div className='pl-3 sm:text-center'>
                    <span className='font-semibold font-serif text-blue-700'><span className='font-bold font-serif  text-2xl mt-3  sm:text-4xl text-blue-700'>W</span >elcome to <span className='font-bold text-2xl sm:text-4xl text-blue-700'>Hostel-Assist-Care</span>.</span>
                </div>
                <div className='flex flex-col items-start pl-3 sm:items-center sm:justify-center font-semibold font-serif gap-1 text-blue-700 mb-5'>

                    <span  >By accessing or using our website, you agree to be bound by these Terms and Conditions.</span>
                    <span >If you do not agree with any part of these terms,</span>
                    <span >you must not use our website.</span>

                </div>

                <div className='sm:flex  sm:justify-around sm:items-center'>
                        <Rules/>
                    <div>
                        <img src={preview} className='rounded-full hidden sm:block' width={430} alt="" />
                    </div>
                </div>



            </div>
        </>
    )
}

export default TermsPage

