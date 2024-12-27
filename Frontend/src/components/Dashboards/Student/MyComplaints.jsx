import React from "react";

const MyComplaints = () => {
  const complaints = [
    {
      id: 1,
      title: "Air Conditioner Issue",
      description:
        "The air conditioner in Room 204 has not been functioning for the past week. It requires urgent repair as it impacts the comfort of students.",
      date: "2024-12-27",
      time: "10:00 AM",
      image: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      title: "Water Leakage in Bathroom",
      description:
        "There is persistent water leakage in the bathroom on the first floor. It needs immediate attention to prevent damage.",
      date: "2024-12-26",
      time: "02:00 PM",
      image: "https://via.placeholder.com/120",
    },
    {
      id: 3,
      title: "Broken Chair in Study Hall",
      description:
        "One of the chairs in the study hall is broken and could cause injury. Kindly have it replaced soon.",
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
            Manage Your Complaints
          </h1>
          <p className="text-blue-600 text-sm sm:text-base md:text-lg mt-3">
            Track the status and details of your complaints below.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
          <button className="bg-blue-100 text-blue-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-blue-200 transition-all">
            Personal
          </button>
          <button className="bg-purple-100 text-purple-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-purple-200 transition-all">
            Public
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
                  <p className="text-xs sm:text-sm md:text-base text-gray-800">
                    {complaint.description}
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

              {/* Actions */}
              <div className="flex justify-between items-center mt-3 sm:mt-4">
                <div className="flex gap-2">
                  <button className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-green-600 transition-all">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-red-600 transition-all">
                    Delete
                  </button>
                </div>
                <div className="text-blue-600 text-sm sm:text-base cursor-pointer hover:text-blue-800">
                  <span className="material-symbols-outlined">comment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
