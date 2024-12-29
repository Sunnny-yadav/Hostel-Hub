import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkBoxState: false,
  ViewMealForm: false
};

export const termConditionslice = createSlice({
  name: "TermCondition",
  initialState,
  reducers: {
    UpdateCheckboxState: (state, action) => {
      console.log("check");
      state.checkBoxState = !state.checkBoxState;
      console.log(state.checkBoxState)
    },

    ShowMealForm: (state, action) => {
      state.ViewMealForm = true;
    },

    hideAddMealForm: (state, action) => {
        state.ViewMealForm = false;
      },
     
    
  },


});

export const { UpdateCheckboxState, ShowMealForm, hideAddMealForm } =
  termConditionslice.actions;
export default termConditionslice.reducer;
