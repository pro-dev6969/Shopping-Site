

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        open: (state)=>{
            state.isOpen = true
        },
        close: (state)=>{
            state.isOpen = false
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;