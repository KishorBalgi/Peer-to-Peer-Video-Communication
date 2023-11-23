import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/redux";

const initialState: IUser = {
  id: "",
  name: "",
  email: "",
  createdAt: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.createdAt = "";
      state.token = "";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
