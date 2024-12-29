import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../../../Context/userContext";
import { toast } from "react-toastify";
import { useComplaintContext } from "../../../../Context/complaintContext";


const RaiseComplaint_Form = () => {
  const navigate = useNavigate();
  const { Token } = useUserContext();
  const { addNewComplaintInComplaintArray } = useComplaintContext();
  const [complaintData, setComplaintData] = useState({
    Title: "",
    Type: "",
    image: null,
    Description: ""
  })


  const updateComplaintData = (e) => {
    const { name, value, files } = e.target;
    setComplaintData((data) => (
      {
        ...data,
        [name]: name === "image" ? files[0] : value
      }
    ))
  };

  const onComplaintSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData()

    for (const key in complaintData) {
      if (key) {
        formdata.append(key, complaintData[key])
      }
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/complaints/register-complaint", {
        method: "POST",
        headers: {
          Authorization: Token
        },
        body: formdata
      })

      const parsedData = await response.json();
      if (response.ok) {
        addNewComplaintInComplaintArray(parsedData.data)
        toast.success(parsedData.message)
        navigate("/student-dashboard/review-complaints")
      } else {
        toast.error(parsedData.message)
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-6 sm:py-10 md:py-15 lg:py-20 h-full">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8">
          {/* Text Section */}
          <div className="max-w-2xl px-4 lg:pr-24 mb-10 lg:mb-0">
            <p className="mb-2 text-blue-600 font-bold text-md sm:text-xl">
              PHCET Complaint Raising System
            </p>
            <h3 className="mb-5 text-xl sm:text-2xl md:text-3xl font-semibold">
              Submit Your Grievance
            </h3>
            <p className="mb-4 sm:mb-8 md:mb-12 lg:mb-16 text-sm sm:text-md text-gray-600">
              Hostel Grievance Redressal ensures a swift and confidential
              resolution of student concerns. We guarantee a quick response to
              submitted complaints, fostering a secure and comfortable living
              environment for all hostel residents.
            </p>
            {/* Features */}
            <div className="space-y-6">
              <div className="flex font-medium">
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
                  <span className="text-sm sm:text-md text-gray-600">
                    Swift grievance resolution prioritizes timely and effective
                    solutions, ensuring students' concerns are promptly
                    addressed and resolved.
                  </span>
                </div>
              </div>
              <div className="flex font-medium">
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
                  <span className="text-sm sm:text-md text-gray-600">
                    Your grievances are handled with utmost confidentiality,
                    ensuring privacy and trust throughout the hostel grievance
                    redressal process.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white border border-gray-200 shadow-md rounded-lg max-w-lg w-full p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Submit Complaint
            </h3>
            <p className="text-sm text-gray-600 mb-8">
              Contact us for hostel grievance redressal.
            </p>
            <form onSubmit={onComplaintSubmit} className="space-y-6">
              <input
                type="text"
                id="Title"
                name="Title"
                value={complaintData.Title}
                onChange={updateComplaintData}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Enter Complaint Title"
              />
              <input
                type="file"
                name="image"
                onChange={updateComplaintData}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <div className="flex items-center gap-6 mt-4">
                <span className="font-medium text-gray-800">Type:</span>
                <div className="flex gap-4">
                  <label className="text-gray-500">
                    <input
                      type="radio"
                      name="Type"
                      value="personal"
                      onChange={updateComplaintData}
                      checked={complaintData.Type === "personal"}
                      className="mr-2"
                    />
                    personal
                  </label>
                  <label className="text-gray-500">
                    <input
                      type="radio"
                      name="Type"
                      value="public"
                      onChange={updateComplaintData}
                      checked={complaintData.Type === "public"}
                      className="mr-2"
                    />
                    public
                  </label>
                </div>
              </div>
              <textarea
                id="Description"
                name="Description"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Describe your issue here..."
                onChange={updateComplaintData}
                value={complaintData.Description}
                rows="4"
              ></textarea>
              <button
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow hover:bg-blue-500 transition-all"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaiseComplaint_Form;
