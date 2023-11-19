import { PayloadAction } from "@reduxjs/toolkit";
import { ICall, IStream } from "@/types/redux";

// Add local stream:
export const addLocalStreamReducer = (
  state: ICall,
  action: PayloadAction<IStream>
) => {
  state.localStream = action.payload;
};

// Remove local stream:
export const removeLocalStreamReducer = (state: ICall) => {
  state.localStream = null;
};

// Add remote stream:
export const addRemoteStreamReducer = (
  state: ICall,
  action: PayloadAction<IStream>
) => {
  state.remoteStreams.push(action.payload);
};

// Remove remote stream:
export const removeRemoteStreamReducer = (
  state: ICall,
  action: PayloadAction<string>
) => {
  state.remoteStreams = state.remoteStreams.filter(
    (stream) => stream.peerId !== action.payload
  );
};
