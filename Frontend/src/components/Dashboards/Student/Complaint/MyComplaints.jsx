import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComplaintContext } from "../../../../Context/complaintContext";
import noComplaint from '../../../../assets/dashboard/noComplaint.png'

const MyComplaints = () => {
  const navigate = useNavigate();
  const [complaintType, setComplaintType] = useState("personal");
  const { getComplaintsByIdAndType, complaintsToBeDisplayed, filterFetchedComplaints, deleteComplaint, complaintsnotPresent } = useComplaintContext();
  const [loading, setLoading] = useState(true);
  const [showDeleteBox, setshowDeleteBox] = useState(false)
  const [complaintId, setcomplaintId] = useState(null)

  const getTime = (UTC_time) => {
    let date = new Date(UTC_time);
    date.setMinutes(date.getMinutes() + 330);
    let hours = date.getUTCHours();
    let min = date.getUTCMinutes();
    let am_pm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    let time = `${hours}:${min.toString().padStart(2, '0')} ${am_pm}`;
    return time;
  };

  const GoToEditPage = (complaintId) => {
    navigate(`/student-dashboard/${complaintId}/edit-complaint`);
  }

  useEffect(() => {
    setLoading(true);  // Set loading to true when starting to fetch
    getComplaintsByIdAndType(complaintType);  // Fetch complaints
  }, [complaintType]);

  useEffect(() => {
    if (complaintsToBeDisplayed?.complaints?.length > 0) {
      setLoading(false);  // Data is loaded, set loading to false
    }
  }, [complaintsToBeDisplayed]);

  useEffect(()=>{
    if(complaintsnotPresent){
      setLoading(false)
    }
  },[complaintsnotPresent])

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
          <button
            onClick={() => setComplaintType("personal")}
            className="bg-blue-100 text-blue-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-blue-200 transition-all">
            {complaintsToBeDisplayed?.complaints?.length > 0 && complaintsToBeDisplayed?.complaints[0]?.Type === "personal" ? `Personal : ${complaintsToBeDisplayed.count}` : "Personal"}
          </button>
          <button
            onClick={() => setComplaintType("public")}
            className="bg-purple-100 text-purple-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-purple-200 transition-all">
            {complaintsToBeDisplayed?.complaints?.length > 0 && complaintsToBeDisplayed?.complaints[0]?.Type === "public" ? `Public :   ${complaintsToBeDisplayed.count}` : "Public"}
          </button>
        </div>
      </div>

      {/* Spinner for loading state */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold text-blue-800">Loading...</p>
        </div>
      ) : (
        /* Filters and Complaints Section */
        <div className="w-full max-w-7xl mx-auto relative bg-white rounded-xl shadow-lg p-4 sm:p-6">
          {/* Filters */}
          <div className="flex sticky top-12 lg:top-0 flex-wrap justify-center gap-3 sm:gap-4 mb-8 bg-blue-100 p-2 lg:p-4 rounded-lg">
            <button onClick={() => filterFetchedComplaints("Pending")
            } className="bg-yellow-100 text-yellow-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-yellow-200 transition-all">
              Pending
            </button>
            <button onClick={() => filterFetchedComplaints("Inprogress")} className="bg-orange-100 text-orange-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-orange-200 transition-all">
              In Progress
            </button>
            <button onClick={() => filterFetchedComplaints("Resolved")} className="bg-green-100 text-green-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-green-200 transition-all">
              Resolved
            </button>
          </div>

          {/* Complaints List */}
          <div className={`${complaintsToBeDisplayed?.complaints?.length === 0 ? "" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 "}`}>
            {complaintsToBeDisplayed?.complaints?.length === 0 ? (
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
            ) :
              complaintsToBeDisplayed?.complaints?.map((complaint) => (
                <div
                  key={complaint._id}
                  className="flex flex-col justify-between bg-purple-200 rounded-lg shadow p-3 sm:p-4 border hover:shadow-lg transition-all">
                  {/* Complaint Details */}
                  <div className="flex items-center">
                    {/* Image */}
                    <img
                      src={complaint.image}
                      alt={complaint.Title}
                      className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md shadow border border-purple-400 mr-3 sm:mr-4 shadow-purple-700"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-800">
                        {complaint.Title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-800">
                        {complaint.Description}
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium text-orange-800">
                          Date: {complaint.createdAt.split("T")[0]}
                        </span>{" "}
                        |{" "}
                        <span className="font-medium text-green-800">
                          Time: {getTime(complaint.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => GoToEditPage(complaint._id)}
                        className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-green-600 transition-all">
                        Edit
                      </button>
                      <button onClick={() => {
                        setshowDeleteBox(!showDeleteBox);
                        setcomplaintId(complaint._id)
                      }} className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-red-600 transition-all">
                        Delete
                      </button>
                    </div>
                    <div className="text-blue-600 text-sm sm:text-base cursor-pointer hover:text-blue-800 hover:bg-purple-300 p-1 pb-0 hover:rounded-md hover:transition-all hover:duration-300 hover:text-center ">
                      <span
                        onClick={() => navigate("/student-dashboard/comments")}
                        className="material-symbols-outlined">
                        comment 
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className={`${showDeleteBox ? "fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 " : "hidden"}`}>
        <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-4 sm:mx-8 md:mx-12 text-center">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">
            Are you sure you want to delete this complaint?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                deleteComplaint(complaintId)
                setshowDeleteBox(false)
              }}
              className="bg-red-500 text-white py-1.5 px-4 sm:py-2 sm:px-6 rounded-md hover:bg-red-600 transition-all text-sm sm:text-base">
              Yes, Delete
            </button>
            <button
              onClick={() => setshowDeleteBox(false)}
              className="bg-gray-500 text-white py-1.5 px-4 sm:py-2 sm:px-6 rounded-md hover:bg-gray-600 transition-all text-sm sm:text-base">
              Cancel
            </button>
          </div>
        </div>
      </div>




    </div>
  );
};

export default MyComplaints;
