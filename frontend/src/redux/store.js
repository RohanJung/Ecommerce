import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./features/Auth/userAuthSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: userAuthSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
