import { configureStore } from "@reduxjs/toolkit";
import TermReducers from './slices/TermsConditionSlice.js'
import MealReducers from './slices/MealSlice.js'

export const store = configureStore({
    reducer:{
        TermCondition : TermReducers,
        Meal : MealReducers
    }
})