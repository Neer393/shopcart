import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{username:"Anonymous",isLoggedIn:false},
    reducers:{
        login(state,action){
            state.username = action.payload;
            state.isLoggedIn =true;
        },
        logout(state){
            state.username="Anonymous";
            state.isLoggedIn =false;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;