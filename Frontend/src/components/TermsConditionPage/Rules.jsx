import React, { useRef } from 'react'
import CheckAgreement from './CheckAgreement'


function Rules() {

    const getScrollDistance = () => {
        console.log("yes")
        if (window.matchMedia('(max-width: 640px)').matches) {
            return 250
        } else if (window.matchMedia('(min-width: 641px) and (max-width:768px)').matches) {
            return 260
        } else {
            return 200
        }
    }

    const scrollRef = useRef(null);
    const scrollUP = () => {
        if (scrollRef.current) {
            scrollRef.current?.scrollBy(
                {
                    top: getScrollDistance(),
                    behavior: 'smooth',
                }
            )
        }
    }

    const scrollDown = () => {
        if (scrollRef.current) {
            scrollRef.current?.scrollBy(
                {
                    top: -getScrollDistance(),
                    behavior: 'smooth'
                }
            )
        }
    }
    return (
        <>
            <div className='flex flex-col gap-2'>
                <div ref={scrollRef} className="rule flex flex-col overflow-auto  w-fit h-56  border-2 rounded-2xl sm:m-3 sm:ml-10  shadow-2xl bg-slate-300 gap-3">
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['1.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            User Registration and Accounts
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>Users must be hostel residents or affiliated with a hostel to register and use our services</li>
                            <li className='m-1 sm:m-0'>You are responsible for maintaining the confidentiality of your account information</li>
                            <li className='m-1 sm:m-0'>Users must provide accurate and up-to-date information during registration.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['2.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            User Conduct
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0 '>Posting false, misleading, or harmful information.</li>
                            <li className='m-1 sm:m-0 '>Harassing, threatening, or discriminating against other users.</li>
                            <li className='m-1 sm:m-0 '>Attempting to hack, misuse, or disrupt the website.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['3.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            Complaint Submission
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>Complaints should be genuine and related to hostel facilities or issues.</li>
                            <li className='m-1 sm:m-0'>Users are expected to provide accurate details when raising a complaint.</li>
                            <li className='m-1 sm:m-0'>Abusive, false, or frivolous complaints may result in account suspension.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['4.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            Roommate Matching
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>Users must respect the privacy and preferences of potential roommates.</li>
                            <li className='m-1 sm:m-0'>The website is not liable for any issues or disputes arising from roommate arrangements.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['5.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            Meal Polls and Other Features
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>Users may participate in meal polls or other community-driven features.</li>
                            <li className='m-1 sm:m-0'>Poll results are advisory and do not guarantee changes to meal plans or services.</li>
                            <li className='m-1 sm:m-0'>Users must not manipulate or spam polls or any other community features.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['6.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            Termination of Accounts
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>We have rights to suspend account for violation of terms</li>
                            <li className='m-1 sm:m-0'>Users may also terminate their accounts by contacting support.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="relative text-2xl font-bold text-gray-800 border-b-2 border-black pb-2 before:content-['7.'] before:absolute before:left-0  before:pl-1 before:w-1  before:text-2xl before:text-black pl-6 flex justify-center items-center p-2">
                            Changes to the Terms and Conditions
                        </h1>
                    </div>
                    <div>
                        <ul className="list-disc list-inside ml-4 font-semibold sm:p-0 md:p-5  p-2 text-xl text-gray-900">
                            <li className='m-1 sm:m-0'>Website reserves the right to modify these Terms and Conditions at any time.</li>
                            <li className='m-1 sm:m-0'>Users will be notified of significant change.</li>
                        </ul>
                    </div>
                </div>
                <CheckAgreement scrollUP={scrollUP} scrollDown={scrollDown} />
            </div>
        </>
    )
}

export default Rules