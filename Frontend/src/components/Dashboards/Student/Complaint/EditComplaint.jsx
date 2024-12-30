import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useComplaintContext } from "../../../../Context/complaintContext";
import { toast } from "react-toastify";

const EditComplaint = () => {
  const { complaintId } = useParams();
  const { getComplaintToBeEdited, ComplaintToBeEdited, getComplaintsByIdAndType, complaintsToBeDisplayed, Token } = useComplaintContext();
  const [localStorageType, setLocalStorageType] = useState(JSON.parse(localStorage.getItem("ComplaintType")) || null);
  const [updatedComplaintData, setUpdatedComplaintData] = useState({
    Title: "Existing Complaint Title",
    image: null,
    Type: "personal",
    Description: "Existing complaint description...",
  });
  const navigate = useNavigate();
  
  const getTypeFromLocalStorage = (localStorageType) => {
    if (localStorageType) {
      getComplaintsByIdAndType(localStorageType); // Fetch complaints by type
    }
  }
  useEffect(() => {
    localStorageType && getTypeFromLocalStorage(localStorageType)

  }, [localStorageType]);


  useEffect(() => {
    // Fetch complaint by ID when `complaintId` is available
    if (complaintId) {
      getComplaintToBeEdited(complaintId);
    }
  }, [complaintId, complaintsToBeDisplayed]);

  useEffect(() => {

    if (ComplaintToBeEdited) {
      setUpdatedComplaintData((prev) => ({
        ...prev,
        Title: ComplaintToBeEdited.Title || "Default Title",
        Type: ComplaintToBeEdited.Type || "personal",
        Description: ComplaintToBeEdited.Description || "Default Description",
      }));

      // Only update local storage if `Type` exists
      if (ComplaintToBeEdited.Type) {
        localStorage.setItem("ComplaintType", JSON.stringify(ComplaintToBeEdited.Type));
      }
    }
  }, [ComplaintToBeEdited]);


  const updateComplaintData = (event) => {
    const { name, value, files } = event.target;
    setUpdatedComplaintData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const onComplaintEditSubmit = async (event) => {
    event.preventDefault();
    
    const formdata = new FormData()
    for (const key in updatedComplaintData) {
     formdata.append(key, updatedComplaintData[key])
    }
    try {
      const response = await fetch(`http://localhost:8000/api/v1/complaints/${complaintId}/edit-complaint`,{
        method:"PATCH",
        headers:{
          Authorization:Token
        },
        body:formdata
      });

      const responseData = await response.json();
      if(response.ok){
        toast.success(responseData.message)
        navigate("/student-dashboard/review-complaints")
      }else{
        toast.error(responseData.message)
      }
    } catch (error) {
      toast.error(responseData.message)
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-blue-300 shadow-lg rounded-lg w-full max-w-md sm:max-w-lg p-6">
        {/* Header Section */}
        <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 text-center">
          Edit Complaint
        </h3>
        <p className="text-sm text-blue-600 mb-6 text-center">
          Editing complaint <span className="font-bold text-blue-700">#12345</span>. Make the necessary changes and save your updates.
        </p>

        {/* Form Section */}
        <form onSubmit={onComplaintEditSubmit} className="space-y-5">
          {/* Complaint Title */}
          <div>
            <label
              htmlFor="Title"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Complaint Title
            </label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={updatedComplaintData.Title}
              onChange={updateComplaintData}
              className="w-full rounded-lg border border-blue-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              placeholder="Edit Complaint Title"
            />
          </div>

          {/* Complaint Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Upload Supporting Image (Optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={updateComplaintData}
              className="w-full rounded-lg border border-blue-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all text-sm"
            />
            <p className="text-xs text-blue-500 mt-2">
              Leave blank if no changes are required.
            </p>
          </div>

          {/* Complaint Type */}
          <div>
            <span className="block text-sm font-medium text-blue-700 mb-1">
              Complaint Type
            </span>
            <div className="flex gap-4 items-center">
              <label className="text-blue-600">
                <input
                  type="radio"
                  name="Type"
                  value="personal"
                  onChange={updateComplaintData}
                  checked={updatedComplaintData.Type === "personal"}
                  className="mr-2"
                />
                Personal
              </label>
              <label className="text-blue-600">
                <input
                  type="radio"
                  name="Type"
                  value="public"
                  onChange={updateComplaintData}
                  checked={updatedComplaintData.Type === "public"}
                  className="mr-2"
                />
                Public
              </label>
            </div>
          </div>

          {/* Complaint Description */}
          <div>
            <label
              htmlFor="Description"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Complaint Description
            </label>
            <textarea
              id="Description"
              name="Description"
              className="w-full rounded-lg border border-blue-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              placeholder="Edit your issue description here..."
              onChange={updateComplaintData}
              value={updatedComplaintData.Description}
              rows="4"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg shadow hover:bg-blue-500 transition-all text-sm"
            type="submit"
          >
            Save Changes
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-sm text-slate-700 mt-6 text-center">
          *Changes will be saved to the system. If no edits are required, return to your{" "}
          <NavLink to={'/student-dashboard/review-complaints'} className="text-blue-600 underline">
            Complaints page
          </NavLink>
          .
        </p>
      </div>
    </div>
  );
};

export default EditComplaint;
