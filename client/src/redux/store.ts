import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./features/call/call.slice";

export const store = configureStore({
  reducer: {
    call: callReducer,
  },
});
