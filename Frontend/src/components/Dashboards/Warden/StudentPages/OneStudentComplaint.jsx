import React, { useRef, useState, useEffect } from "react";
import noComments from "../../../../assets/dashboard/noComments.avif";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../../Context/userContext";
import {useComplaintContext} from "../../../../Context/complaintContext"
import { toast } from 'react-toastify'
import noComplaint from '../../../../assets/dashboard/noComplaint.png'


const OneStudentComplaint = () => {
  const { Token } = useUserContext();
  const { studentId, complaintType } = useParams();
  const {getComments, comments} = useComplaintContext()
  const [Fetchedcomplaint, setFetchedComplaints] = useState([]);
  const [DisplayedComplaint, setDisplayedComplaint] = useState([])
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const ref = useRef();

  const handleCommentClick = (complaint) => {
    setCurrentComplaint(complaint);
    setIsCommentsVisible(true);

    complaint && getComments(complaint._id)
  };

  const closeComments = () => {
    setIsCommentsVisible(false);
    setCurrentComplaint(null);
  };

  const getSpecificUserComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/complaints/${complaintType}/${studentId}/get-complaints-by-id-type`, {
        method: "GET",
        headers: {
          Authorization: Token
        }
      });

      const responseData = await response.json();
      console.log(responseData)
      if (response.ok) {
        setFetchedComplaints(responseData.data.complaints);
        setDisplayedComplaint(responseData.data.complaints);
      } else {
        toast.error(responseData.message)
      }

    } catch (error) {
      toast.error(error)
    }
  };

  const sortDisplayedComplaint = (state) => {
    if (state === "All") {
      setDisplayedComplaint(Fetchedcomplaint)
      return;
    }
    const filteredComplaint = Fetchedcomplaint.filter((complaint) => complaint.state === state)
    if (filteredComplaint.length > 0) {
      setDisplayedComplaint(filteredComplaint)
    } else {
      setDisplayedComplaint([])
      toast.error(`No ${state} Complaints`)

    }

  };

  useEffect(() => {
    if (studentId && complaintType) {
      getSpecificUserComplaints()
    }
  }, [studentId, complaintType])


  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen relative">
      {/* Header */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 animate-pulse">
          All Complaints
        </h1>

        {/* Action Buttons to Filter by Status */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            
            onClick={() => sortDisplayedComplaint("All")}
            className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 transition duration-300`}>
            All
          </button>
          <button
            
            onClick={() => sortDisplayedComplaint("Pending")}
            className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 `}>
            Pending
          </button>
          <button
            
            onClick={() => sortDisplayedComplaint("Inprogress")}
            className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300`}>
            In Progress
          </button>
          <button
            
            onClick={() => sortDisplayedComplaint("Resolved")}
            className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 }`}>
            Resolved
          </button>
        </div>


        {/* Complaints List */}
        <div className={`${DisplayedComplaint.length === 0 ? "":"grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"}`}>
          {
            DisplayedComplaint?.length === 0 ? (
              <div className="flex flex-col font-serif justify-center items-center bg-blue-100 p-6 sm:p-8 rounded-xl shadow-lg w-full   min-h-[300px]">
                <div className="text-center">
                  <img
                    src={noComplaint}
                    alt="No Complaints"
                    className="w-24 sm:w-32 h-24 sm:h-32 object-cover mx-auto mb-4 rounded-md"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
                    No Complaints Found
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700">
                    There are no complaints under this category at the moment. Please check back later.
                  </p>
                </div>
              </div>
            ):(
              DisplayedComplaint?.map((complaint) => (
                <div
                  key={complaint?._id}
                  className="flex flex-col justify-between bg-purple-200 rounded-lg shadow p-4 sm:p-5 md:p-6 border hover:shadow-lg transition-all"
                >
                  <div className="flex items-center">
                    <img
                      src={complaint?.image}
                      alt={complaint?.Title}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md shadow border border-purple-400 mr-4 sm:mr-5"
                    />
                    <div className="flex flex-col gap-1 justify-end items-start">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-800">
                        {complaint?.Title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-800">
                        {complaint?.Description}
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium text-orange-800">
                          Date: {new Date(complaint?.createdAt).toLocaleString().split(",")[0]}
                        </span>{" "}
                        |{" "}
                        <span className="font-medium text-green-800">
                          Time: {new Date(complaint?.createdAt).toLocaleString().split(",")[1]}
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
              ))
            )
          }
          
          
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
              {comments.length} {" "}Comments for:{" "}
                <span className="block text-sm sm:text-lg md:text-xl font-medium text-gray-800">
                  {currentComplaint?.Title}
                </span>
              </h2>
              <div
                ref={ref}
                className="space-y-4 overflow-y-auto max-h-[70vh] border-t border-gray-300 pt-4"
              >
                {comments?.length > 0 ? (
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
                          <span>{new Date(comment?.createdAt).toLocaleString().split(",")[0]}</span>
                          <span>{new Date(comment?.createdAt).toLocaleString().split(",")[1]}</span>
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
