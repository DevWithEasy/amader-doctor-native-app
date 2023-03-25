import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isLoading : false,
        isAuth : false,
        user : {},
        doctor : {},
        random : 0
    },
    reducers : {
        loading : (state,action)=>{
            state.isLoading = true;
        },
        addAuth : (state,action)=>{
            state.isAuth = true;
            state.user = action.payload
        },
        removeAuth : (state,action)=>{
            state.isAuth = false;
            state.user = {}
            state.doctor = {}
        },
        addDoctor : (state,action)=>{
            state.doctor = action.payload
        },
        refresh : (state,action)=>{
            state.random = action.payload
        },
    }
})

export const {loading,addAuth,removeAuth,addDoctor,refresh} = authSlice.actions
export default authSlice.reducer