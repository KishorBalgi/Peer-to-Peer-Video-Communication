import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./features/call/call.slice";
import chatReducer from "./features/chat/chat.slice";
import userReducer from "./features/user/user.slice";

export const store = configureStore({
  reducer: {
    call: callReducer,
    chat: chatReducer,
    user: userReducer,
  },
});
