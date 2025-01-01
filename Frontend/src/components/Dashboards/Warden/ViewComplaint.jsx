import React from "react";
import { useNavigate } from "react-router-dom";

const WardenComplaints = () => {
const navigate = useNavigate()
  const complaints = [
    {
      id: 1,
      title: "Air Conditioner Issue",
      raisedBy: "John Doe",
      date: "2024-12-27",
      time: "10:00 AM",
      image: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      title: "Water Leakage in Bathroom",
      raisedBy: "Jane Smith",
      date: "2024-12-26",
      time: "02:00 PM",
      image: "https://via.placeholder.com/120",
    },
    {
      id: 3,
      title: "Broken Chair in Study Hall",
      raisedBy: "Emily Johnson",
      date: "2024-12-25",
      time: "08:30 AM",
      image: "https://via.placeholder.com/120",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-10">
      {/* Header Section */}
      <div className="w-full bg-blue-200 py-6 mb-6 shadow-md">
        <div className="text-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-800 drop-shadow-md">
            Manage Resident Complaints
          </h1>
          <p className="text-blue-600 text-sm sm:text-base md:text-lg mt-3">
            Overview and manage all complaints reported by residents.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
          <button className="bg-blue-100 text-blue-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-blue-200 transition-all">
            Individual Complaints
          </button>
          <button className="bg-purple-100 text-purple-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-purple-200 transition-all">
            Common Area Complaints
          </button>
        </div>
      </div>

      {/* Filters and Complaints Section */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 bg-blue-100 p-4 rounded-lg">
          <button className="bg-yellow-100 text-yellow-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-yellow-200 transition-all">
            Pending
          </button>
          <button className="bg-orange-100 text-orange-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-orange-200 transition-all">
            In Progress
          </button>
          <button className="bg-green-100 text-green-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-green-200 transition-all">
            Resolved
          </button>
        </div>

        {/* Complaints List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex flex-col justify-between bg-purple-200 rounded-lg shadow p-3 sm:p-4 border hover:shadow-lg transition-all"
            >
              {/* Complaint Details */}
              <div className="flex items-center">
                {/* Image */}
                <img
                  src={complaint.image}
                  alt={complaint.title}
                  className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md shadow border border-purple-400 mr-3 sm:mr-4 shadow-purple-700"
                />
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-800">
                    {complaint.title}
                  </h3>
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium text-gray-800">
                      Raised By: {complaint.raisedBy}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium text-orange-800">
                      Date: {complaint.date}
                    </span>{" "}
                    |{" "}
                    <span className="font-medium text-green-800">
                      Time: {complaint.time}
                    </span>
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <div className="flex justify-end mt-3 sm:mt-4">
                <button
                onClick={()=>navigate("/warden-dashboard/complaintDetails")}
                className="bg-blue-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-blue-600 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardenComplaints;
