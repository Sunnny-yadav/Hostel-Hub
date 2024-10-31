import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RaiseComplaint = () => {

  const [Complaint_Data, setComplaint_Data] = useState({
    Room: "",
    about: "",
    ComplaintName: ""
  })

  const navigate = useNavigate()


  const handel_Complaint_Data = (e) => {
    const { name, value } = e.target;
    setComplaint_Data((data) => (
      {
        ...data,
        [name]: value
      }
    ))
  };

  const handel_Complaint_Submit = (e) => {
    e.preventDefault();
    console.log(Complaint_Data)
    setComplaint_Data({
      Room: "",
      about: "",
      ComplaintName: ""
    })
  }

  const Back_To_Profile =()=>{
      navigate('/studentProfile')
  } 
  return (
    <>
        
      <section className="relative bg-gray-100 py-12 text-gray-800 sm:py-24 h-full">
      <div className="absolute top-3 right-11">
        <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={Back_To_Profile}
              >
              Back To Profile
            </button>
        </div>
        <div className="bg-gray-100 mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div className="max-w-2xl px-4 lg:pr-24">
            <p className="mb-2 text-blue-600 font-bold text-xl ">
              PHCET Hostel Grievance Redressal
            </p>
            <h3 className="mb-5 text-3xl font-semibold">Submit Your Grievance</h3>
            <p className="mb-16 text-md text-gray-600">
              Hostel Grievance Redressal ensures a swift and confidential
              resolution of student concerns. We guarantee a quick response to
              submitted complaints, fostering a secure and comfortable living
              environment for all hostel residents.
            </p>
            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Swift Grievance Resolution</p>
                <span className="font-normal text-gray-600">
                  Swift grievance resolution prioritizes timely and effective
                  solutions, ensuring students' concerns are promptly addressed
                  and resolved.
                </span>
              </div>
            </div>
            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Confidentiality Assured</p>
                <span className="font-normal text-gray-600">
                  Your grievances are handled with utmost confidentiality,
                  ensuring privacy and trust throughout the hostel grievance
                  redressal process.
                </span>
              </div>
            </div>
            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Easy Communication</p>
                <span className="font-normal text-gray-600">
                  Effortless communication is facilitated, providing a smooth
                  and accessible channel for expressing and resolving grievances
                  within the hostel community.
                </span>
              </div>
            </div>
          </div>
          <div className="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
            <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
              <h3 className="mb-1 inline-block text-3xl font-medium">
                <span className="mr-4">Submit Complaint</span>
                <span className="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700 sm:inline">
                  Quick Response
                </span>
              </h3>
              <p className="text-gray-600">
                Contact us for hostel grievance redressal
              </p>
            </div>
            <div className="p-4 sm:p-8">
              <form onSubmit={handel_Complaint_Submit} >
                <input
                  type="text"
                  id="ComplaintName"
                  name="ComplaintName"
                  className="mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-3 shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition-all duration-200"
                  placeholder="Enter Complaint name"
                  value={Complaint_Data.ComplaintName}
                  onChange={handel_Complaint_Data}

                />
                <input
                  id="Room"
                  name="Room"
                  type="text"
                  className="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-3 shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition-all duration-200"
                  placeholder="Enter your Room No."
                  value={Complaint_Data.Room}
                  onChange={handel_Complaint_Data}
                />
                <label className="mt-5 mb-2 font-semibold text-xl inline-block max-w-full">
                  Tell us about your grievance
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={Complaint_Data.about}
                  onChange={handel_Complaint_Data}
                  className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-3 shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition-all duration-200"
                  placeholder="Describe your issue here..."
                ></textarea>
                <button
                  className="w-full rounded-lg bg-blue-700 p-3 text-center font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaiseComplaint;
