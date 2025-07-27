import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

// Example slice (you can create your own)

export const store = configureStore({
  reducer: {
    dataSlice: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
