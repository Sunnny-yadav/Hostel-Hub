import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  FoodArray: [],
};

export const MealSlice = createSlice({
  name: "MealContainer",
  initialState,
  reducers: {
    SubmitMeal: (state, action) => {
      const Food_Data = Object.entries(action.payload);
      // Resetting the FoodArray to a new array
      state.FoodArray = Food_Data.map(([key, value]) => ({
        id: nanoid(),
        option: value,
        count: 0,
      }));
      console.log(state.FoodArray);
    },

    IncreaseCount: (state, action) => {
      console.log(action.payload);
      state.FoodArray = state.FoodArray.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              count: item.count + 1,
            }
          : item
      );
      console.log(state.FoodArray);
    },

    loaditems : (state, action)=>{
      state.FoodArray = action.payload;
    }



  },
});

export const { SubmitMeal, IncreaseCount, loaditems } = MealSlice.actions;
export default MealSlice.reducer;
