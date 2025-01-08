import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useWardenComplaintContext } from '../../../../Context/WardenComplaintContext';
import { useComplaintContext } from '../../../../Context/complaintContext';
import noComments from "../../../../assets/dashboard/noComments.avif";


const ComplaintDetails = () => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showUpdateStateValue, setShowupdateStateValue] = useState(false);
  const { getComplaintDetail, ComplaintToVeiwed, getComplaintsByType, ComplaintToBeDisplayed, saveTheUpdatedState } = useWardenComplaintContext();
  const { getComments, comments, insertComment } = useComplaintContext();
  const [newComment, setnewComment] = useState("");
  const [updatedState, setupdatedState] = useState("")
  const [LsforComplaintDetailPage, setLsforComplaintDetailPage] = useState(JSON.parse(localStorage.getItem("Type")) || null);

  const ref = useRef();
  const updatedStateref = useRef()
  const navigate = useNavigate();
  const { complaintId } = useParams();

  const ShowCommentsWithComplaintLayout = () => {
    setShowCommentBox(true);
  }

  const getIST_Time = (UTC_time) => {
    const date = new Date(UTC_time);
    date.setMinutes(date.getMinutes() + 330);
    let hours = date.getUTCHours();
    let min = date.getUTCMinutes();
    let am_pm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const time = `${hours}:${min.toString().padStart(2, "0")} ${am_pm}`;
    return time;
  };

  useEffect(() => {
    if (LsforComplaintDetailPage) {
      console.log(LsforComplaintDetailPage)
      getComplaintsByType(LsforComplaintDetailPage);
    }
  }, [LsforComplaintDetailPage]);

  useEffect(() => {
    if (complaintId) {
      getComplaintDetail(complaintId);
    }
  }, [complaintId, ComplaintToBeDisplayed]);

  useEffect(() => {
    if (ComplaintToVeiwed && ComplaintToVeiwed.Type) {
      localStorage.setItem("Type", JSON.stringify(ComplaintToVeiwed.Type));
    }
  }, [ComplaintToVeiwed]);

  useEffect(() => {
    if (showCommentBox) {
      getComments(complaintId)
    }

  }, [showCommentBox])

  useEffect(() => {
    if (comments.length !== 0) {
      ref.current?.scrollBy({
        top: 200,
        behavior: "smooth",
      });
    }
  }, [comments]);

  const addNewComment = (e) => {
    e.preventDefault();
    insertComment({
      text: newComment,
      complaintId,
    });
    setnewComment("");
  };

  return (
    <div className="max-w-full mx-auto p-2 pb-0">
      {/* Starting Message */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold">
              Complaint Tracking System
            </h1>
            {/* in this below <P></P> write actual student name  */}
            <p className="mt-2 text-sm sm:text-base">
              Track the progress and discussion on User complaint. View or add
              comments to communicate with the {ComplaintToVeiwed?.studentData?.fullName}.
            </p>
          </div>
          <span
            className="material-symbols-outlined cursor-pointer text-xl sm:text-2xl md:text-4xl"
            onClick={() => navigate(`/warden-dashboard/view-complaints`)}
          >
            arrow_back
          </span>
        </div>
      </div>

      {/* Container for Complaint Details and Comments */}
      {showCommentBox ? (
        <div className="bg-blue-200 p-4 sm:p-5 rounded-lg shadow-lg mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* complaint section  */}
          <div className="sm:col-span-1 md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Complaint Details
              </h2>
              <button
                onClick={() => setShowCommentBox(false)}
                className="bg-blue-200 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-blue-300 transition-all"
              >
                &#x2716;
              </button>
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <div>
                <div className="font-bold">Title:</div>
                <p>{ComplaintToVeiwed?.Title}</p>
              </div>
              <div>
                <div className="font-bold">Description:</div>
                <p>{ComplaintToVeiwed?.Description}</p>
              </div>
              <div>
                <div className="font-bold">Image:</div>
                <img src={ComplaintToVeiwed?.image} alt="Complaint" className="w-full h-32 sm:h-48 object-cover mt-2 rounded-lg" />
              </div>
              <div className='flex  justify-between'>
                <div>
                  <div className="font-bold">Raised By:</div>
                  <p>{ComplaintToVeiwed?.studentData?.fullName}</p>
                </div>
                <div className='mr-16'>
                  <div className="font-bold">Room No:</div>
                  <p>{ComplaintToVeiwed?.studentData?.roomNumber}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <div className="font-bold">phone:</div>
                  <p>{ComplaintToVeiwed?.studentData?.phone}</p>
                </div>
                <div>
                  <div className="font-bold">Date & Time:</div>
                  <span>{ComplaintToVeiwed?.createdAt?.split("T")[0]}</span>{" "}
                  <span>{getIST_Time(ComplaintToVeiwed?.createdAt)}</span>
                </div>
              </div>
              <div>
                <div className="font-bold">Status:</div>
                <p>{ComplaintToVeiwed?.state}</p>
              </div>
              <div>
              {ComplaintToVeiwed?.state !== "Resolved" && (
                    <div className="flex items-center space-x-4">
                      {
                        showUpdateStateValue ? <button
                          onClick={() => {
                            saveTheUpdatedState({
                              complaintId,
                              state: updatedStateref.current.value,
                            });

                            setShowupdateStateValue(!showUpdateStateValue);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition">
                          Save
                        </button> :
                          <button
                            onClick={() => setShowupdateStateValue(!showUpdateStateValue)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition">
                            Update State
                          </button>
                      }
                      <label className={`${showUpdateStateValue ? "flex items-center" : "hidden"}`}>
                        <input
                          ref={updatedStateref}
                          type="radio"
                          className="form-radio text-blue-600"
                          value={ComplaintToVeiwed?.state === "Pending" ? "Inprogress" : "Resolved"}
                          checked
                          readOnly
                        />
                        <span className="ml-2">
                          {ComplaintToVeiwed?.state === "Pending" ? "InProgress" : "Resolved"}
                        </span>
                      </label>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Comments Section Division */}
          <div className="sm:col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="flex justify-between rounded-lg items-center p-1 mb-2">
              <h2 className="text-lg sm:text-xl font-semibold">Comments</h2>
              <p className="bg-blue-500 p-1 pt-0 sm:p-2 sm:pt-1 sm:pb-1 rounded font-medium text-white">
                {comments?.length}
              </p>
            </div>
            <div ref={ref} className="space-y-4 overflow-y-auto max-h-64 sm:max-h-80">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b py-2 flex justify-between items-start sm:items-center"
                  >
                    <div className="text-sm sm:text-base">
                      <p className="font-semibold">
                        {comment?.commenter?.role === "warden" ? "You" : "student"}
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
                <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10 space-y-4">
                  <img
                    src={noComments}
                    alt="No Comments"
                    className="w-20 h-20 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain"
                  />
                  <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-semibold">
                    No comments available for this complaint.
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm lg:text-base max-w-xs sm:max-w-md">
                    Be the first one to leave a comment for this complaint. Share
                    your thoughts or feedback now!
                  </p>
                </div>
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={addNewComment} className="mt-4">
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                rows="2"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setnewComment(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white p-3 w-full rounded-lg text-sm sm:text-base"
              >
                Add Comment
              </button>
            </form>
          </div>

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
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.Title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Date:</p>
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.createdAt?.split("T")[0]}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 font-medium">Description:</p>
                  <p className="text-gray-700">{ComplaintToVeiwed?.Description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium">Raised By:</p>
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.studentData?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Room No:</p>
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.studentData?.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Contact:</p>
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.studentData?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">State:</p>
                    <p className="text-gray-900 font-semibold">{ComplaintToVeiwed?.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Time:</p>
                    <p className="text-gray-900 font-semibold">{getIST_Time(ComplaintToVeiwed?.createdAt)}</p>
                  </div>
                </div>


                {/* action button  */}
                <div className="flex justify-between mt-4">

                  {ComplaintToVeiwed?.state !== "Resolved" && (
                    <div className="flex items-center space-x-4">
                      {
                        showUpdateStateValue ? <button
                          onClick={() => {
                            saveTheUpdatedState({
                              complaintId,
                              state: updatedStateref.current.value,
                            });

                            setShowupdateStateValue(!showUpdateStateValue);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition">
                          Save
                        </button> :
                          <button
                            onClick={() => setShowupdateStateValue(!showUpdateStateValue)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition">
                            Update State
                          </button>
                      }
                      <label className={`${showUpdateStateValue ? "flex items-center" : "hidden"}`}>
                        <input
                          ref={updatedStateref}
                          type="radio"
                          className="form-radio text-blue-600"
                          value={ComplaintToVeiwed?.state === "Pending" ? "Inprogress" : "Resolved"}
                          checked
                          readOnly
                        />
                        <span className="ml-2">
                          {ComplaintToVeiwed?.state === "Pending" ? "InProgress" : "Resolved"}
                        </span>
                      </label>
                    </div>
                  )}


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
                src={ComplaintToVeiwed.image}
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
