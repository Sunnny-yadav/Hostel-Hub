import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import { toast } from 'react-toastify'

// Note: These context was created for student complaint but the file name is only complaintcontext instead of studentComplaintContext
const complaintContext = createContext();

export const ComplaintContextProvider = ({ children }) => {
    // complaint state
    const [loading, setLoading] = useState(true);
    const [FetchedComplaintsById, setFetchComplaintsById] = useState([])
    const [FetchedComplaintsByIdAndType, setFetchComplaintsByIdAndType] = useState({});
    const { Token, AccessToken } = useUserContext();
    const [complaintsToBeDisplayed, setcomplaintsToBeDisplayed] = useState(FetchedComplaintsByIdAndType);
    const [ComplaintToBeEdited, setComplaintToBeEdited] = useState({});

    // comments states
    const [comments, setComments] = useState([])

    const getUserComplaintsById = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/complaints/get-complaint-by-id", {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setFetchComplaintsById(responseData.data);
            } else {
                console.log("error occured in response of getuserComplaint funciton")
            }

        } catch (error) {
            console.log("complaintContext.jsx::getuserComplaits() ->", error.message)
        }
    };

    const getComplaintsByIdAndType = async (Type) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${Type}/get-complaints-by-id-type`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setcomplaintsToBeDisplayed(responseData.data);
                setFetchComplaintsByIdAndType(responseData.data);
                // setcomplaintnotPresent(false)
            } else {
                // setcomplaintnotPresent(!complaintsnotPresent);
                setcomplaintsToBeDisplayed({ complaits: [], count: 0 })
                setFetchComplaintsByIdAndType({ complaits: [], count: 0 })
                setLoading(false)
                toast.error(responseData.message)
            };

        } catch (error) {
            console.error("complaintContext.jsx :: getcomplaintsByidAndType() ->", error.message)
        }
    };

    const addNewComplaintInComplaintArray = (newComplaint) => {
        setFetchComplaintsById((prev) => [newComplaint, ...prev]);
    };

    const filterFetchedComplaints = (state) => {
        const complaints = FetchedComplaintsByIdAndType?.complaints.filter((complaint) => complaint.state === state);
        const count = complaints.length
        setcomplaintsToBeDisplayed({
            complaints,
            count
        });
    };

    const getComplaintToBeEdited = (complaintId) => {

        const FoundComplaint = complaintsToBeDisplayed?.complaints?.find((complaint) => complaint._id === complaintId);
        if (FoundComplaint) {
            setComplaintToBeEdited(FoundComplaint);
        }
    };

    const FilterDashboardComplaintAfterComplaintDelete = (complaintId) => {
        const updatedComplaints = FetchedComplaintsById.filter(complaint => complaint._id !== complaintId);
        setFetchComplaintsById(updatedComplaints);
    };

    const deleteComplaint = async (complaintId) => {
        console.log(complaintId)
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${complaintId}/delete-complaint`, {
                method: "DELETE",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            console.log(responseData)
            if (response.ok) {
                const updatedComplaints = complaintsToBeDisplayed.complaints.filter(complaint => complaint._id !== complaintId);
                FilterDashboardComplaintAfterComplaintDelete(complaintId)
                setcomplaintsToBeDisplayed({
                    complaints: updatedComplaints,
                    count: updatedComplaints.length
                });
                toast.success(responseData.message);
            } else {
                toast.error(responseData.message)
            }


        } catch (error) {
            console.log("complaintContext::deletecomplaint->", error.message)

        }
    };

    //---> useEffect of complaints <---

    useEffect(() => {
        if(AccessToken){
            getUserComplaintsById();
        };
    }, [AccessToken]);





    //--->  functions of comments are below this <-----

    const getComments = async (complaintId) => {
        setComments([])
        try {
            const response = await fetch(`http://localhost:8000/api/v1/comments/${complaintId}/get-comments`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setComments(responseData.data)
            } else {
                toast.error(responseData.message)
            }


        } catch (error) {
            console.log("complaintContext::getcommets::", error)
        }
    };

    const insertComment = async (dataObj) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/comments/${dataObj.complaintId}/insert-comment`, {
                method: "POST",
                headers: {
                    Authorization: Token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObj)
            });

            const responseData = await response.json();
            if (response.ok) {
                getComments(dataObj.complaintId)
            } else {
                toast.error(responseData.message)
            }

        } catch (error) {
            console.log("getcomments::", error)
        }
    }




    return (
        <complaintContext.Provider
            value={
                {
                    //complaint props
                    FetchedComplaintsById,
                    addNewComplaintInComplaintArray,
                    getComplaintsByIdAndType,
                    complaintsToBeDisplayed,
                    filterFetchedComplaints,
                    getComplaintToBeEdited,
                    ComplaintToBeEdited,
                    Token,
                    deleteComplaint,
                    loading,
                    setLoading,


                    //comments props
                    getComments,
                    comments,
                    insertComment
                }
            }>
            {children}
        </complaintContext.Provider>
    )
};

export const useComplaintContext = () => {
    return useContext(complaintContext);
};


