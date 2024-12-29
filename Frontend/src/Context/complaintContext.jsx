import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';

const complaintContext = createContext();

export const ComplaintContextProvider = ({children})=>{
    const [FetchedComplaints, setFetchComplaint] = useState([])
    const {Token, AccessToken} = useUserContext();

    const getUserComplaints = async ()=>{
        try {
            const response = await fetch("http://localhost:8000/api/v1/complaints/get-complaint-by-id",{
                method:"GET",
                headers:{
                    Authorization:Token
                }
            });

            const responseData = await response.json();
            if(response.ok){
                setFetchComplaint(responseData.data);
            }else{
                console.log("error occured in response of getuserComplaint funciton")
            }

        } catch (error) {
            console.log("complaintContext.jsx::getuserComplaits() ->",error.message)
        }
    }

    
    useEffect(()=>{
        AccessToken && getUserComplaints();
    },[AccessToken])


    const addNewComplaintInComplaintArray = (newComplaint)=>{
        setFetchComplaint((prev)=> [newComplaint, ...prev]);
    }

    return(
        <complaintContext.Provider value={{FetchedComplaints, addNewComplaintInComplaintArray}}>
        {children}
        </complaintContext.Provider>
    )
};

export const useComplaintContext = ()=>{
    return useContext(complaintContext);
};