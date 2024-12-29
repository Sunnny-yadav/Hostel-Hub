import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import { toast } from 'react-toastify'

const complaintContext = createContext();

export const ComplaintContextProvider = ({ children }) => {
    const [FetchedComplaintsById, setFetchComplaintsById] = useState([])
    const [FetchedComplaintsByIdAndType, setFetchComplaintsByIdAndType] = useState({});
    const { Token, AccessToken } = useUserContext();
    const [complaintsToBeDisplayed, setcomplaintsToBeDisplayed] = useState(FetchedComplaintsByIdAndType);

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
            console.log(responseData);
            if (response.ok) {
                setFetchComplaintsByIdAndType(responseData.data);
                setcomplaintsToBeDisplayed(responseData.data);
            } else {
                toast.error(responseData.message)
            };

        } catch (error) {
            console.error("complaintContext.jsx :: getcomplaintsByidAndType() ->", error.message)
        }
    }

    const addNewComplaintInComplaintArray = (newComplaint) => {
        setFetchComplaintsById((prev) => [newComplaint, ...prev]);
    }

    const filterFetchedComplaints = (state)=>{
        const complaints = FetchedComplaintsByIdAndType?.complaints.filter((complaint)=> complaint.state === state);
        const count = complaints.length 
        setcomplaintsToBeDisplayed({
            complaints,
            count
        });
    }

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
                    filterFetchedComplaints
                }
            }>
            {children}
        </complaintContext.Provider>
    )
};

export const useComplaintContext = () => {
    return useContext(complaintContext);
};