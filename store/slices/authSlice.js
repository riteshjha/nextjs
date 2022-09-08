import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";
import persist from '../persist';

const initialState = {
    accessToken: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },

        setUser:(state, action) => {
            state.user = action.payload;
        },

        loggedOut:(state, action) => {
            state.accessToken = null;
            state.user = null;
            persist.remove('accessToken')
        }
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
            ...state,
            ...action.payload.auth,
            };
        },
    }
})

export const { setAccessToken, setUser, loggedOut } = authSlice.actions;

export const getAccessToken = (state) => state.auth?.accessToken

export const getUser = (state) => state.auth?.user

export const loggedInUser = (state) => state.auth?.user;

export default authSlice.reducer;

