import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useComplaintContext } from "../../../../Context/complaintContext";
import noComments from "../../../../assets/dashboard/noComments.avif";

const Comments = () => {
  const { complaintId } = useParams();
  const ref = useRef();
  const navigate = useNavigate();
  const [newComment, setnewComment] = useState("");
  const [LsForCommentPage, setLsForCommentPage] = useState(
    JSON.parse(localStorage.getItem("Type")) || null
  );
  const {
    getComplaintToBeEdited,
    ComplaintToBeEdited,
    getComplaintsByIdAndType,
    complaintsToBeDisplayed,
  } = useComplaintContext();
  const { getComments, comments, insertComment } = useComplaintContext();

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
    if (comments.length !== 0) {
      ref.current?.scrollBy({
        top: 200,
        behavior: "smooth",
      });
    }
  }, [comments]);

  useEffect(() => {
    if (LsForCommentPage) {
      getComplaintsByIdAndType(LsForCommentPage);
    }
  }, [LsForCommentPage]);

  useEffect(() => {
    getComments(complaintId);
  }, [complaintId]);

  useEffect(() => {
    if (complaintId) {
      getComplaintToBeEdited(complaintId);
    }
  }, [complaintId, complaintsToBeDisplayed]);

  useEffect(() => {
    if (ComplaintToBeEdited && ComplaintToBeEdited.Type) {
      localStorage.setItem("Type", JSON.stringify(ComplaintToBeEdited.Type));
    }
  }, [ComplaintToBeEdited]);

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
      <div className="bg-blue-200 p-4 sm:p-5 rounded-lg shadow-lg mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Complaint Details Division */}
        <div className="sm:col-span-1 md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-lg">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Complaint Details
              </h2>
              <button
                onClick={() => navigate(`/student-dashboard/${complaintId}/edit-complaint`)}
                className="bg-blue-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-blue-600 transition-all"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <div>
                <div className="font-bold">Title:</div>
                <p>{ComplaintToBeEdited?.Title}</p>
              </div>
              <div>
                <div className="font-bold">Description:</div>
                <p>{ComplaintToBeEdited?.Description}</p>
              </div>
              <div>
                <div className="font-bold">Image:</div>
                <img
                  src={ComplaintToBeEdited?.image}
                  alt="Complaint"
                  className="w-full h-32 sm:h-48 object-cover mt-2 rounded-lg"
                />
              </div>
              <div>
                <div className="font-bold">Date & Time:</div>
                <span>{ComplaintToBeEdited?.createdAt?.split("T")[0]}</span>{" "}
                <span>{getIST_Time(ComplaintToBeEdited?.createdAt)}</span>
              </div>
              <div>
                <div className="font-bold">Status:</div>
                <p>{ComplaintToBeEdited.state}</p>
              </div>
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
    </div>
  );
};

export default Comments;
