import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ComplaintDetails = () => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const navigate = useNavigate();

  const ShowCommentsWithComplaintLayout = () => {
    setShowCommentBox(true);
    navigate("/warden-dashboard/complaintDetails/comments")
  }


  return (
    <div className="max-w-full mx-auto p-2 pb-0">
      {/* Starting Message */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold">
              Complaint Tracking System
            </h1>
            <p className="mt-2 text-sm sm:text-base">
              Track the progress and discussion on your complaint. View or add
              comments to communicate with the warden.
            </p>
          </div>
          <span
            className="material-symbols-outlined cursor-pointer text-xl sm:text-2xl md:text-4xl"
            onClick={() => navigate(`/student-dashboard/review-complaints`)}
          >
            arrow_back
          </span>
        </div>
      </div>

      {/* Container for Complaint Details and Comments */}
        {showCommentBox ? (
          <div className="bg-blue-200 p-4 sm:p-5 rounded-lg shadow-lg mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

            <div className="sm:col-span-1 md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Complaint Details</h2>
              <div className="space-y-2 text-sm sm:text-base">
                <div>
                  <div className="font-bold">Title:</div>
                  <p>Noise in the Hostel</p>
                </div>
                <div>
                  <div className="font-bold">Description:</div>
                  <p>The noise coming from the adjacent rooms is disturbing the residents.</p>
                </div>
                <div>
                  <div className="font-bold">Image:</div>
                  <img src="complaint-image.jpg" alt="Complaint" className="w-full h-32 sm:h-48 object-cover mt-2 rounded-lg" />
                </div>
                <div>
                  <div className="font-bold">Date & Time:</div>
                  <p>2024-12-28 09:00 AM</p>
                </div>
                <div>
                  <div className="font-bold">Status:</div>
                  <p>In Progress</p>
                </div>
              </div>
            </div>
            <Outlet />

          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              {/* Complaint Information */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full sm:w-2/3">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Complaint Details</h2>

                <div className="space-y-6 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-600 font-medium">Title:</p>
                      <p className="text-gray-900 font-semibold">Noise is Harming</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Date:</p>
                      <p className="text-gray-900 font-semibold">12/2/2024</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Description:</p>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam officia aspernatur laboriosam.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 font-medium">Raised By:</p>
                      <p className="text-gray-900 font-semibold">Manish Joshi</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Room No:</p>
                      <p className="text-gray-900 font-semibold">A-192</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Contact:</p>
                      <p className="text-gray-900 font-semibold">9874563214</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Time:</p>
                      <p className="text-gray-900 font-semibold">12:00 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={ShowCommentsWithComplaintLayout}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition w-full sm:w-auto text-center">
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Complaint Image */}
              <div className="w-full sm:w-1/3 flex justify-center">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.VJ6Han-RZj6Vl115t1FpdAHaE8&pid=Api&P=0&h=180"
                  alt="Complaint"
                  className="w-full h-auto max-w-xs sm:max-w-none rounded-lg shadow-md object-cover border border-gray-200"
                />
              </div>
            </div>
          </div>
        )}

       
    </div>
  );
};

export default ComplaintDetails;
