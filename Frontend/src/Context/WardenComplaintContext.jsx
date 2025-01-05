import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import { toast } from 'react-toastify'


const complaintcontext = createContext();


export const WardenComplaintContextProvider = ({ children }) => {
    const { userData, Token, AccessToken } = useUserContext([]);
    const [loading, setLoading] = useState(true)
    const [UsersList, setUsersList] = useState();
    const [FetchedComplaint, setFetchedComplaint] = useState([])
    const [ComplaintToBeDisplayed, setComplaintToBeDisplayed] = useState([])
    const [ComplaintToVeiwed, setComplaintToVeiwed] = useState({});

    
    const FetcheAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/complaints/get-users", {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            })

            const responseData = await response.json()
            if (response.ok) {
                setUsersList(responseData.data)
            } else {
                toast.error(responseData.error)
            }


        } catch (error) {
            console.log("WardenComplaintContext:: FetchAllUsers::", error)
        }
    };

    const getComplaintsByType = async (Type) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${Type}/get-complaints-by-type`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setComplaintToBeDisplayed(responseData.data)
                setFetchedComplaint(responseData.data)
            } else {
                setLoading(false);
                setComplaintToBeDisplayed([]);
                setFetchedComplaint([]);
                toast.error(responseData.message)
            }

        } catch (error) {
            console.log("waredencomplaintcontext:: getcomplaintsByType ::", error.message)
        }
    };

    const filterFetchedComplaints = (state) => {
        const complaints = FetchedComplaint.filter((complaint) => complaint.state === state);
        setComplaintToBeDisplayed(complaints);
    };

    const getComplaintDetail = (complaintId) => {

        const FoundComplaint = ComplaintToBeDisplayed?.find((complaint) => complaint._id === complaintId);
        if (FoundComplaint) {
            setComplaintToVeiwed(FoundComplaint);
        }
    };

    const saveTheUpdatedState = async (complaintObj)=>{
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${complaintObj.complaintId}/edit-complaint-state`,{
                method:"PATCH",
                headers:{
                    Authorization:Token,
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(complaintObj)
            })
            const responseData = await response.json()
            
            if(response.ok){
                toast.success(responseData.message)
            }
        } catch (error) {
            toast.error(responseData.message)
            console.log("wardencontext :: saveTheUpdatedState ::",error.message)
        }
    }


    useEffect(() => {
        if (AccessToken) {
            FetcheAllUsers();
        }
    }, [AccessToken])


    return (
        <complaintcontext.Provider value={{
             UsersList,
             getComplaintsByType,
             ComplaintToBeDisplayed,
             loading,
             setLoading,
             filterFetchedComplaints ,
             getComplaintDetail,
             ComplaintToVeiwed,
             saveTheUpdatedState
             }}>


            {children}


        </complaintcontext.Provider>
    )
};



export const useWardenComplaintContext = () => {
    return useContext(complaintcontext);
}