import { useRouter } from "next/navigation";

import { socket } from "./socket.services";
import socketEvents from "@/configs/socket.json";
import { initLocalStream } from "@/services/webRTC/init";
import { handleSignallingMessage } from "../webRTC/peerConnection";
import { createOffer, userLeftCallHandler } from "../webRTC/peerConnection";
import { TCallbackResponse } from "@/types/socket";
import { TSignallingMessage } from "@/types/socket";

// Initiate a new call:
export const initNewCall = (navigate: ReturnType<typeof useRouter>) => {
  if (!socket) return; //🚩 !socket
  socket.emit(
    socketEvents.START_NEW_CALL,
    { userSocketId: socket.id },
    (res: TCallbackResponse) => {
      navigate.push(`/${res.data.callId}`);
    }
  );
};

// Join an existing call:
export const joinExistingCall = async (
  callId: string,
  navigate: ReturnType<typeof useRouter>
) => {
  if (!socket) return; //🚩 !socket

  // Init local stream:
  await initLocalStream();

  socket.emit(
    socketEvents.JOIN_CALL,
    {
      callId,
      userSocketId: socket.id,
    },
    (res: TCallbackResponse) => {
      if (res.status === "error") {
        navigate.push("/");
      }
      socket.callId = callId;
    }
  );
};

// New user joined the call:
export const newUserJoinedCall = () => {
  socket.on(socketEvents.USER_JOINED, (userSocketId: string) => {
    console.log("New user joined the call: ", userSocketId);
    // socket.emit("test", { to: userSocketId, msg: "Hello" });
    createOffer(userSocketId);
  });
};

// Leave call:
export const leaveCall = () => {
  socket.emit(socketEvents.LEAVE_CALL, {
    callId: socket.callId,
    userSocketId: socket.id,
  });
};

// User left the call:
export const userLeftCall = () => {
  socket.on(socketEvents.USER_LEFT, (userSocketId: string) => {
    console.log("User left the call: ", userSocketId);
    userLeftCallHandler(userSocketId);
  });
};

// Send signalling message:
export const sendSignallingMessage = (message: TSignallingMessage) => {
  if (!socket) return; //🚩 !socket
  socket.emit(socketEvents.SIGNAL_MSG, message);
};

// Receive signalling message:
export const receiveSignallingMessage = () => {
  socket.on(socketEvents.SIGNAL_MSG, handleSignallingMessage);
};
