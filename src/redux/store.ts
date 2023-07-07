import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./features/stateSlice";
import  {productsApi}  from "./services/productsApi";
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from "./features/cartSlice";
import codeMainReducer from './features/codeMainSlice';

export const store = configureStore({
    reducer:{
        stateReducer,
        cartReducer,
        codeMainReducer,
        [productsApi.reducerPath]:productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;