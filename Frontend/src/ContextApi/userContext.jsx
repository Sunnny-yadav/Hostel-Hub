import { createContext, useContext } from "react";

export const User_context = createContext();

export const UserContextProvider = ({children})=>{

let value  = 1;


    return(
        <User_context.Provider value={{value}}>
        {children}
        </User_context.Provider>
    )
};


export const UserContext= ()=>{
    return useContext(User_context);
}