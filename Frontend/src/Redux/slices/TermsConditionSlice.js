import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkBoxState: false,
  ViewMealForm: false,
  ToastMsg :false
};

export const termConditionslice = createSlice({
  name: "TermCondition",
  initialState,
  reducers: {
    UpdateCheckboxState: (state, action) => {
      console.log("check");
      state.checkBoxState = !state.checkBoxState;
    },

    ShowMealForm: (state, action) => {
      state.ViewMealForm = true;
    },

    hideAddMealForm: (state, action) => {
        state.ViewMealForm = false;
      },
      ShowToastMsg: (state, action) =>{
        state.ToastMsg = !state.ToastMsg;
      }
    
  },


});

export const { UpdateCheckboxState, ShowMealForm, hideAddMealForm , ShowToastMsg} =
  termConditionslice.actions;
export default termConditionslice.reducer;
