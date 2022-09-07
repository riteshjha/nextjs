import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { authApi } from './reducers/authApi'
import { authSlice } from './slices/authSlice';

const makeStore = () =>  
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [authApi.reducerPath]: authApi.reducer
        },

        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false
            }).concat([
                authApi.middleware
            ])
        },
    });


export const storeWrapper = createWrapper(makeStore);
