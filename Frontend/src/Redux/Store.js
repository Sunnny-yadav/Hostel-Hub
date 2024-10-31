import { configureStore } from "@reduxjs/toolkit";
import TermReducers from './slices/TermsConditionSlice.js'

export const store = configureStore({
    reducer:{
        TermCondition : TermReducers,
    }
})