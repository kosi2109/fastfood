import { createSlice } from "@reduxjs/toolkit";


export const formErrorSlice = createSlice({
    name : "formError",
    initialState : [],
    reducers : {
        getErrors : (state, action) => {
            return action.payload;
        },
        clearFormError : () => {
            return [];
        }
    }
}) 

export const {getErrors,clearFormError} = formErrorSlice.actions;

export default formErrorSlice.reducer;