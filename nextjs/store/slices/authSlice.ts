import { createSlice } from '@reduxjs/toolkit'
import { getCookie, hasCookie } from 'cookies-next';

if (hasCookie("fastfood_auth")) {
    var initial = JSON.parse(getCookie("fastfood_auth") as string);
} else {
    var initial = null;

}

export const authSlice = createSlice({
    name : 'auth',
    initialState : initial,
    reducers : {
        login : (state, action) => {
            return action.payload.user;
        },
        logout : (state)=>{
            return null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;