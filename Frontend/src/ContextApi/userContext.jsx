import { createContext, useContext, useEffect, useState } from "react";

export const User_context = createContext();

export const UserContextProvider = ({ children }) => {
    const [AccessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("AccessToken")) || null);
    const [userData, setuserData] = useState("");
    
    
    //fetch loged in user data
    const fetchUserData = async () => {
        try {
            let response = await fetch("http://localhost:8000/api/v1/users/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${AccessToken}`
                }
            });
            if (response.ok) {
                let fetchedData = await response.json();
                console.log(fetchedData.data)
                setuserData(fetchedData.data);
            } else {
                throw new Error("User Data not fetched successfully")
            }

        } catch (error) {
            console.log(`Frontend::ContextApi::UserContext::${error.msg}`);
        }

    };

    // store token in local storage
    const SetTokenInLocalStorage = (Token) => {
        localStorage.setItem("AccessToken", JSON.stringify(Token))
        setAccessToken(Token)
    };

    const Logout= () =>{
        localStorage.removeItem("AccessToken")
        setAccessToken(null)
    }

    useEffect(() => {
        AccessToken && fetchUserData();
    }, [AccessToken]);



    return (
        <User_context.Provider value={{ SetTokenInLocalStorage , userData, Logout}}>
            {children}
        </User_context.Provider>
    )
};


export const UserContext = () => {
    return useContext(User_context);
}