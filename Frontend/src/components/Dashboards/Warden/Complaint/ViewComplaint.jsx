import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWardenComplaintContext } from "../../../../Context/WardenComplaintContext";
import noComplaint from '../../../../assets/dashboard/noComplaint.png'


const WardenComplaints = () => {
  const navigate = useNavigate();
  const [complaintType, setcomplaintType] = useState("personal");
  const { getComplaintsByType, ComplaintToBeDisplayed, loading, setLoading, filterFetchedComplaints } = useWardenComplaintContext();

  const getTime = (UTC_time) => {
    let date = new Date(UTC_time);
    date.setMinutes(date.getMinutes() + 330);
    let hours = date.getUTCHours();
    let min = date.getUTCMinutes();
    let am_pm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    let time = `${hours}:${min.toString().padStart(2, "0")} ${am_pm}`;
    return time;
  };

  useEffect(() => {
    complaintType && getComplaintsByType(complaintType);
  }, [complaintType]);

  useEffect(() => {
    if (ComplaintToBeDisplayed) {
      setLoading(false);
    }
  }, [ComplaintToBeDisplayed]);

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
          <button
            onClick={() => setcomplaintType("personal")}
            className="bg-blue-100 text-blue-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-blue-200 transition-all"
          >
            {ComplaintToBeDisplayed?.length > 0 && ComplaintToBeDisplayed[0]?.Type === "personal"
              ? `Individual Complaints : ${ComplaintToBeDisplayed.length}`
              : "Individual Complaints"}
          </button>
          <button
            onClick={() => setcomplaintType("public")}
            className="bg-purple-100 text-purple-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-purple-200 transition-all"
          >
            {ComplaintToBeDisplayed?.length > 0 && ComplaintToBeDisplayed[0]?.Type === "public"
              ? ` Common Area Complaints : ${ComplaintToBeDisplayed.length}`
              : " Common Area Complaints"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold text-blue-800">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 bg-blue-100 p-4 rounded-lg">
            <button
              onClick={() => filterFetchedComplaints("Pending")}
              className="bg-yellow-100 text-yellow-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-yellow-200 transition-all">
              Pending
            </button>
            <button
              onClick={() => filterFetchedComplaints("Inprogress")}
              className="bg-orange-100 text-orange-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-orange-200 transition-all">
              In Progress
            </button>
            <button
              onClick={() => filterFetchedComplaints("Resolved")}
              className="bg-green-100 text-green-800 font-semibold py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base rounded-full shadow hover:bg-green-200 transition-all">
              Resolved
            </button>
          </div>

          {/* Complaints List */}
          <div className={`${ComplaintToBeDisplayed?.length === 0 ? "" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 "}`}>
            {ComplaintToBeDisplayed?.length === 0 ? (
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
            ) : (
              ComplaintToBeDisplayed?.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex flex-col justify-between bg-purple-200 rounded-lg shadow p-3 sm:p-4 border hover:shadow-lg transition-all"
                >
                  {/* Complaint Details */}
                  <div className="flex items-center">
                    <img
                      src={complaint?.image}
                      alt={complaint?.Title}
                      className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md shadow border border-purple-400 mr-3 sm:mr-4 shadow-purple-700"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-800">
                        {complaint?.Title}
                      </h3>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium text-gray-800">
                          Raised By: {complaint?.studentData?.fullName}
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium text-orange-800">
                          Date: {complaint?.createdAt?.split("T")[0]}
                        </span>{" "}
                        |{" "}
                        <span className="font-medium text-green-800">
                          Time: {getTime(complaint?.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex justify-end mt-3 sm:mt-4">
                    <button
                      onClick={() => navigate(`/warden-dashboard/${complaint._id}/complaintDetails`)}
                      className="bg-blue-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm md:text-base rounded-md hover:bg-blue-600 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WardenComplaints;
