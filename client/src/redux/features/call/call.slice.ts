import { createSlice } from "@reduxjs/toolkit";
import {
  addLocalStreamReducer,
  removeLocalStreamReducer,
  addRemoteStreamReducer,
  removeRemoteStreamReducer,
} from "./call.reducer";
import { ICall } from "@/types/redux";

// Initial state:
const initialState: ICall = {
  localStream: null,
  remoteStreams: [],
};

// Slice:
const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    addLocalStream: addLocalStreamReducer,
    removeLocalStream: removeLocalStreamReducer,
    addRemoteStream: addRemoteStreamReducer,
    removeRemoteStream: removeRemoteStreamReducer,
  },
});

export const {
  addLocalStream,
  removeLocalStream,
  addRemoteStream,
  removeRemoteStream,
} = callSlice.actions;

export default callSlice.reducer;
