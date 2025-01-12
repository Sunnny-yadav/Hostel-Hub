import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import { toast } from 'react-toastify'


const complaintcontext = createContext();


export const WardenComplaintContextProvider = ({ children }) => {
    const { Token, AccessToken } = useUserContext();
    const [loading, setLoading] = useState(true)
    const [UsersList, setUsersList] = useState();
    const [FetchedComplaint, setFetchedComplaint] = useState([])
    const [ComplaintToBeDisplayed, setComplaintToBeDisplayed] = useState([])
    const [ComplaintToVeiwed, setComplaintToVeiwed] = useState({});

    //Note: below states are related to the Meal
    const [addedMealPoll, setaddedmealPoll] = useState({});

    //Note: below states are related to the noticeBoard
    const [Fetchednotice, setFetchedNotice] = useState({});



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

    const replace_CurrentState_With_UpdatedState = (updatedComplaintState) => {
        setComplaintToVeiwed((complaint) => (
            {
                ...complaint,
                state: updatedComplaintState.state
            }
        ))
    };
    const replace_CurrentMealState_With_UpdatedMealState = (updatedMealState) => {
        setaddedmealPoll((Meal) => (
            {
                ...Meal,
                pollStatus: updatedMealState.pollStatus
            }
        ))
    };

    const saveTheUpdatedState = async (complaintObj) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/complaints/${complaintObj.complaintId}/edit-complaint-state`, {
                method: "PATCH",
                headers: {
                    Authorization: Token,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(complaintObj)
            })
            const responseData = await response.json()

            if (response.ok) {
                replace_CurrentState_With_UpdatedState(responseData.data)
                toast.success(responseData.message)
            }
        } catch (error) {
            toast.error(responseData.message)
            console.log("wardencontext :: saveTheUpdatedState ::", error.message)
        }
    };

    // Note: The below functions are related to Meal 

    const addMealPoll = async (mealPollData) => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/meals/add-meal", {
                method: "POST",
                headers: {
                    Authorization: Token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mealPollData)
            });

            const responseData = await response.json();
            console.log(responseData.data);
            if (response.ok) {
                localStorage.setItem("MealPollId", JSON.stringify(responseData.data._id));
                setaddedmealPoll(responseData.data)
                toast.success(responseData.message)

            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            console.log("wardenContext :: addMealpoll::", error)
        }
    };

    const getMealPollById = async (pollId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/meals/${pollId}/get-mealPoll-by-id`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            })

            const responseData = await response.json()
            if (response.ok) {
                console.log(responseData.data)
                setaddedmealPoll(responseData.data)
            } else {
                console.log("error in getmealPollByid")
            }
        } catch (error) {
            console.log("getmealPollByid", error)
        }
    };

    const saveTheUpdatedMealStatus = async (MealObj) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/meals/${MealObj.mealId}/update-state`, {
                method: "PATCH",
                headers: {
                    Authorization: Token,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(MealObj)
            });
            const responseData = await response.json()

            if (response.ok) {
                replace_CurrentMealState_With_UpdatedMealState(responseData.data)
                toast.success(responseData.message)
            }
        } catch (error) {
            toast.error(responseData.message)
            console.log("wardencontext :: saveTheUpdatedMealStatus ::", error.message)
        }
    };


    // Note: below functions are designed for the NoticeBoard
    const getLatestNoticePosted = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/notice/get-latest-notice", {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });
            const responseData = await response.json();

            if (response.ok) {
                setFetchedNotice(responseData.data)
            } else {
                toast.error(responseData.message)
            };

        } catch (error) {
            console.log("error occured while fetching latest notice", error)
        }
    }


    useEffect(() => {
        if (AccessToken) {
            FetcheAllUsers();
        }
    }, [AccessToken])


    return (
        <complaintcontext.Provider value={{
            Token,
            UsersList,
            getComplaintsByType,
            ComplaintToBeDisplayed,
            loading,
            setLoading,
            filterFetchedComplaints,
            getComplaintDetail,
            ComplaintToVeiwed,
            saveTheUpdatedState,

            addMealPoll,
            addedMealPoll,
            getMealPollById,
            saveTheUpdatedMealStatus,

            Fetchednotice,
            setFetchedNotice,
            getLatestNoticePosted,

        }}>


            {children}


        </complaintcontext.Provider>
    )
};



export const useWardenComplaintContext = () => {
    return useContext(complaintcontext);
}