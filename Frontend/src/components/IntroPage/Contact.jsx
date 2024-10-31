import React, { useRef, useState } from 'react'
import email from '../../assets/Intopage/email.jpg'
import emailjs from '@emailjs/browser'
import ToastMessage from '../ToastMessage';


function Contact() {
    const [userData, setuserData] = useState({
        user_name: "",
        user_email: "",
        message: ""
    });
    const [emailSendSuccessfully, setemailSendSuccessfully] = useState(false);

    const form = useRef();

    const handelContactForm = (e) => {
        const { name, value } = e.target;
        setuserData((user) => (
            {
                ...user,
                [name]: value
            }
        ))
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_ohykjvh', 'template_y1kv5ys', form.current, { publicKey: 'B7QYDm0uBDHi6Axvi' })
            .then(
                () => {
                    console.log("message sent successfully");
                    setuserData({
                        user_name: "",
                        user_email: "",
                        message: ""
                    });
                    setemailSendSuccessfully((value) => !value);
                    setTimeout(() => {
                        setemailSendSuccessfully((value) => !value);
                    }, 2500);
                },
                (error) => {
                    console.log("failed")
                }
            )
    }

    return (
        <>
            <div>
                {emailSendSuccessfully && <ToastMessage ToastMessage={"Sent Successfully"} />}
            </div>

            <div className='flex justify-around items-center relative '>
                <div>
                    <img src={email} alt="email Img" width={450} className=' left-10 top-[45%] relative' />
                </div>
                <div>
                    <form
                        className='flex flex-col '
                        onSubmit={sendEmail}
                        ref={form}>

                        {/* Username */}
                        <label
                            className='font-semibold  font-serif pb-1'
                            htmlFor="user_name ">Name :</label>
                        <input
                            className='bg-gray-100 rounded-full w-72 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none  '
                            placeholder='Enter your name'
                            type="text"
                            name="user_name"
                            value={userData.user_name}
                            onChange={handelContactForm}
                            required />
                        <br />

                        {/* userEmail */}
                        <label
                            className='font-semibold  font-serif pb-1'
                            htmlFor="user_email">Email id: </label>
                        <input
                            className='bg-gray-100 rounded-full w-72 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none  '
                            placeholder='Enter your Email'
                            type="email"
                            name="user_email"
                            value={userData.user_email}
                            onChange={handelContactForm}
                            required />
                        <br />

                        {/* user message  */}
                        <label
                            className='font-semibold  font-serif pb-1'
                            htmlFor="message">Message : </label>
                        <textarea
                            rows={5}
                            className='bg-gray-100 rounded-lg w-72 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none  '
                            placeholder='Type message'
                            name="message"
                            value={userData.message}
                            onChange={handelContactForm}
                            required></textarea>

                        {/* submit Button */}
                        <button className='flex bg-blue-600 hover:bg-blue-400 hover:text-black text-white font-serif py-2 px-4  rounded-full mt-2 w-fit font-semibold items-center'>
                            Submit
                            <span class="material-symbols-outlined">
                                arrow_right_alt
                            </span>
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Contact