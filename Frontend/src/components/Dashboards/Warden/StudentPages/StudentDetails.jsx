import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWardenComplaintContext } from "../../../../Context/WardenComplaintContext";

const StudentDetails = () => {
  const navigate = useNavigate()
  const { studentId } = useParams();
  const [studentInfo, setStudentInfo] = useState({})
  const [showComplaints, setShowComplaints] = useState(false);
  const { sortedUsersList } = useWardenComplaintContext()
  const [complaintType, setcomplaintType] = useState("");


  const toggleComplaints = () => {
    setShowComplaints(true);
  };

  const handleComplaintType = (e) => {
    const { value } = e.target;
    setcomplaintType(value)
  };

  const getStudentData = (studentId) => {
    const studentData = sortedUsersList?.filter((data) => data._id === studentId)
    setStudentInfo(studentData[0])
  };

  useEffect(() => {
    if (studentId && sortedUsersList) {
      getStudentData(studentId)
    }
  }, [studentId, sortedUsersList])

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-6 animate-pulse">
          Student Profile
        </h1>


        {/* Student Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={studentInfo?.avatar}
              alt="Student Avatar"
              className="md:w-32 md:h-32 h-20 w-20 rounded-full mb-4 object-cover border-4 border-indigo-500 hover:scale-125 hover:transition-all duration-200 transition"
            />
            <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
          </div>

          {/* Form Section */}
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                value={studentInfo?.fullName}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="text"
                value={studentInfo?.email}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                type="text"
                value={studentInfo?.phone}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Branch Name</label>
              <input
                type="text"
                value={studentInfo?.branchName}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Current Year</label>
              <input
                type="text"
                value={studentInfo?.currentYear}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Room Number</label>
              <input
                type="text"
                value={studentInfo?.roomNumber}
                disabled
                className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300"
              />
            </div>
          </form>

          {/* Buttons Section */}
          <div className="mt-6">
            <button
              id="view-complaints-btn"
              onClick={toggleComplaints}
              className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
            >
              View Complaints
            </button>

            {showComplaints && (
              <div id="complaints-section" className="mt-4">
                <div className="mb-4">
                  <label className="flex justify-between max-w-60 text-gray-700 font-medium mb-1">
                    <span>Complaint Type</span>
                    <span
                      onClick={() => setShowComplaints(false)}
                      className="material-symbols-outlined bg-blue-100 rounded-full cursor-pointer"
                    >
                      close
                    </span>
                  </label>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="complaintType"
                        value="personal"
                        onChange={handleComplaintType}
                        className="form-radio"
                      />
                      <span className="ml-2">Personal</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="complaintType"
                        value="public"
                        onChange={handleComplaintType}
                        className="form-radio"
                      />
                      <span className="ml-2">Public</span>
                    </label>
                  </div>
                </div>



                <button
                  onClick={() => { navigate(`/warden-dashboard/get-Allstudentdata/${studentId}/${complaintType}/get-studentcomplaint`) }}
                  disabled={complaintType === ""}
                  className={`px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 ${complaintType ===  "" ? "cursor-not-allowed" : ""}`}>
                  Search
                </button>
              </div>
            )}

            <button
              id="view-meal-btn"
              onClick={()=> navigate(`/warden-dashboard/get-Allstudentdata/${studentId}/get-Meals-record`)}
              className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 mt-4 transition duration-300"
            >
              View Meal Votes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
