import React, { useRef, useState } from "react";
import noComments from "../../../../assets/dashboard/noComments.avif";

const OneStudentComplaint = () => {
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const ref = useRef();

  const complaint = [
    {
      id: 1,
      Title: "Noise in Dormitory",
      Description: "Loud noise coming from Dormitory Block A.",
      date: "2025-01-03",
      time: "10:30 AM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      Title: "Water Leakage in Room",
      Description: "Water leakage in the bathroom of Room 101.",
      date: "2025-01-01",
      time: "08:45 PM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      Title: "Power Outage",
      Description: "Power outage in Block B affecting multiple rooms.",
      date: "2025-01-02",
      time: "06:15 PM",
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleCommentClick = (complaint) => {
    setCurrentComplaint(complaint);
    setIsCommentsVisible(true);
  };

  const closeComments = () => {
    setIsCommentsVisible(false);
    setCurrentComplaint(null);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen relative">
      {/* Header */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 animate-pulse">
          All Complaints
        </h1>

        {/* Action Buttons to Filter by Status */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300">
            Pending
          </button>
          <button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300">
            In Progress
          </button>
          <button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300">
            Resolved
          </button>
        </div>


        {/* Complaints List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {complaint.map((complaint) => (
            <div
              key={complaint.id}
              className="flex flex-col justify-between bg-purple-200 rounded-lg shadow p-4 sm:p-5 md:p-6 border hover:shadow-lg transition-all"
            >
              <div className="flex items-center">
                <img
                  src={complaint.image}
                  alt={complaint.Title}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md shadow border border-purple-400 mr-4 sm:mr-5"
                />
                <div className="flex flex-col gap-1 justify-end items-start">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-800">
                    {complaint.Title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-800">
                    {complaint.Description}
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
                  <span
                    className="material-symbols-outlined hover:text-slate-600 hover:cursor-pointer"
                    onClick={() => handleCommentClick(complaint)}
                  >
                    comment
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comments Section */}
        {isCommentsVisible && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 rounded-lg shadow-lg relative animate-slideIn max-h-[90vh] overflow-hidden">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                onClick={closeComments}
              >
                &times;
              </button>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6 break-words">
                Comments for:{" "}
                <span className="block text-sm sm:text-lg md:text-xl font-medium text-gray-800">
                  {currentComplaint?.Title}
                </span>
              </h2>
              <div
                ref={ref}
                className="space-y-4 overflow-y-auto max-h-[70vh] border-t border-gray-300 pt-4"
              >
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="border-b py-3 flex justify-between items-start sm:items-center"
                    >
                      <div className="text-sm sm:text-base">
                        <p className="font-semibold">
                          {comment?.commenter?.role === "student" ? "You" : "Warden"}
                        </p>
                        <p>{comment.text}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm flex flex-col items-end gap-1">
                          <span>{comment?.createdAt?.split("T")[0]}</span>
                          <span>{getIST_Time(comment.createdAt)}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-lg shadow-md p-8 space-y-6">
                    <img
                      src={noComments}
                      alt="No Comments"
                      className="w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-contain"
                    />
                    <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-semibold">
                      No comments available for this complaint.
                    </p>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OneStudentComplaint;
