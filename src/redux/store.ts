import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./features/stateSlice";
import cartReducer from "./features/cartSlice";
import codeMainReducer from './features/codeMainSlice';

export const store = configureStore({
    reducer:{
        stateReducer,
        cartReducer,
        codeMainReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;