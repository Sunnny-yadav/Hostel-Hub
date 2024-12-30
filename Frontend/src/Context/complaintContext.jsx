import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import { toast } from 'react-toastify'

const complaintContext = createContext();

export const ComplaintContextProvider = ({ children }) => {
    // const [complaintsMap, setComplaintsMap] = useState(new Map())
    const [complaintsnotPresent, setcomplaintnotPresent] = useState(false)
    const [FetchedComplaintsById, setFetchComplaintsById] = useState([])
    const [FetchedComplaintsByIdAndType, setFetchComplaintsByIdAndType] = useState({});
    const { Token, AccessToken } = useUserContext();
    const [complaintsToBeDisplayed, setcomplaintsToBeDisplayed] = useState(FetchedComplaintsByIdAndType);
    const [ComplaintToBeEdited, setComplaintToBeEdited] = useState({});


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
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${Type}/get-complaints-by-id-type`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setFetchComplaintsByIdAndType(responseData.data);
                setcomplaintsToBeDisplayed(responseData.data);
                setcomplaintnotPresent(false)
            } else {
                setcomplaintnotPresent(true);
                setcomplaintsToBeDisplayed({complaits:[], count:0})
                setFetchComplaintsByIdAndType({complaits:[], count:0})
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
                setcomplaintsToBeDisplayed({
                    complaints:updatedComplaints,
                    count:updatedComplaints.length
                })
                toast.success(responseData.message);
            } else {
                toast.error(responseData.message)
            }


        } catch (error) {
            console.log("complaintContext::deletecomplaint->", error.message)

        }
    };

    

    // useEffect(()=>{
    //     if(complaintsMapstate){
    //         console.log("i am complaintstate",complaintsMapstate)
    //         const complaintsArray = Array.from(complaintsMap.values());
    //         console.log(complaintsArray)
    //         setcomplaintsToBeDisplayed({
    //                 complaints:complaintsArray,
    //                 count: complaintsArray.length
    //             });
    //     }
    // },[complaintsMapstate])

    // useEffect(() => {
        
    //     if (complaintsToBeDisplayed?.complaints?.length > 0) {
    //         const complaintArray = complaintsToBeDisplayed.complaints
    //         console.log(complaintArray)
    //         const complaintsMap = new Map(complaintArray.map((complaint) => [complaint._id, complaint]));
    //         setComplaintsMap(complaintsMap);
           
    //     }
    // }, [complaintsToBeDisplayed]);

    useEffect(() => {
        AccessToken && getUserComplaintsById();
    }, [AccessToken])



    return (
        <complaintContext.Provider
            value={
                {
                    FetchedComplaintsById,
                    addNewComplaintInComplaintArray,
                    getComplaintsByIdAndType,
                    complaintsToBeDisplayed,
                    filterFetchedComplaints,
                    getComplaintToBeEdited,
                    ComplaintToBeEdited,
                    Token,
                    deleteComplaint,
                    complaintsnotPresent
                }
            }>
            {children}
        </complaintContext.Provider>
    )
};

export const useComplaintContext = () => {
    return useContext(complaintContext);
};


   