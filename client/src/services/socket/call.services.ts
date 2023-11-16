import socketEvents from "@/configs/socket.json";
import { useRouter } from "next/navigation";

import { initLocalStream } from "@/services/webRTC/init";
import { handleSignallingMessage } from "../webRTC/peerConnection";
import { TCallbackResponse } from "@/types/socket";
import { createOffer } from "../webRTC/peerConnection";
import { TSignallingMessage } from "@/types/socket";
import { getSocket } from "./socket.service";

const socket = getSocket();

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
export const joinExistingCall = (
  callId: string,
  navigate: ReturnType<typeof useRouter>
) => {
  if (!socket) return; //🚩 !socket

  socket.emit(
    socketEvents.JOIN_CALL,
    {
      callId,
      userSocketId: socket.id,
    },
    (response: TCallbackResponse) => {
      if (response.status === "error") {
        navigate.push("/");
      }

      // Init local stream:
      initLocalStream();
    }
  );
};

// New user joined the call:
export const newUserJoinedCall = (localStrema: MediaStream) => {
  if (!socket) return; //🚩 !socket
  socket.on(socketEvents.USER_JOINED, (userSocketId: string) => {
    console.log("New user joined the call: ", userSocketId);
    createOffer(localStrema, userSocketId);
  });
};

// Send signalling message:
export const sendSignallingMessage = (message: TSignallingMessage) => {
  if (!socket) return; //🚩 !socket
  socket.emit(socketEvents.SEND_SIGNAL, message);
};

// Receive signalling message:
export const receiveSignallingMessage = (localStream: MediaStream) => {
  if (!socket) return; //🚩 !socket
  socket.on(socketEvents.RECEIVE_SIGNAL, (message: TSignallingMessage) => {
    console.log("Received signalling message: ", message);
    handleSignallingMessage(message, localStream);
  });
};
