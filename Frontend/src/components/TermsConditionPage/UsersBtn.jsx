import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import check from '../../assets/check.png'
import Fingure from '../../assets/fingure1.png'
import { Link } from 'react-router-dom';


function UsersBtn() {

    const checkboxValue = useSelector((state) => state.TermCondition.checkBoxState);


    return (
        <>
            <div>
                <Link to="/Login_SignIn"> <button
                    className="bg-blue-500  mt-3 mr-5 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-end animate-scale-pulse"
                    disabled={checkboxValue ? false : true}
                >
                    Sign In

                </button></Link>
                {
                    checkboxValue ? "" : <div className='absolute bg-blue-600 flex justify-center items-center   p-2 text-white top-2.5  right-44 rounded-3xl font-semibold '>
                        <div><img src={check} width={30} className='inline' /></div>
                        <div> the checkbox</div>
                        <div className='absolute right-[-55px] top-4 animate-liner-pulse'><img src={Fingure} width={50} /></div>
                    </div>
                }
            </div>
        </>
    )
}

export default UsersBtn