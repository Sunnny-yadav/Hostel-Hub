import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkBoxState : false,
}

export const termConditionslice = createSlice({
    name:"TermCondition",
    initialState,
    reducers:{
        UpdateCheckboxState : (state , action)=>{
            console.log("check")
            state.checkBoxState = !(state.checkBoxState); 
        }
    }
});

export const {UpdateCheckboxState} = termConditionslice.actions;
export default termConditionslice.reducer
