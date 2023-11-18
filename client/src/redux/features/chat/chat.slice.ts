import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IChatMessage } from "@/types/redux";

const initialState: IChat = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IChatMessage>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
