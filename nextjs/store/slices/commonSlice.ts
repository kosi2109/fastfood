import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name : 'common',
    initialState : {
        selectedCategory : 'all'
    },
    reducers : {
        changeCategory : (state ,action)=> {
            state.selectedCategory = action.payload;
        }
    }
})

export const {changeCategory} = commonSlice.actions;

export default commonSlice.reducer;