import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    //don't have to bring other api reducers in because we are using apiSlice.inject endpoints
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
