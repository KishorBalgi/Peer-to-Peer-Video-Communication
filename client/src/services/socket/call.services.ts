import { useRouter } from "next/navigation";

import { socket } from "./socket.services";
import socketEvents from "@/configs/socket.json";
import { initLocalStream } from "@/services/webRTC/init";
import { handleSignallingMessage } from "../webRTC/peerConnection";
import { createOffer } from "../webRTC/peerConnection";
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
    (response: TCallbackResponse) => {
      if (response.status === "error") {
        navigate.push("/");
      }
      socket.roomId = callId;
    }
  );

  // socket.on("test", (data) => {
  //   console.log("test: ", data);
  // });
};

// New user joined the call:
export const newUserJoinedCall = () => {
  socket.on(socketEvents.USER_JOINED, (userSocketId: string) => {
    console.log("New user joined the call: ", userSocketId);
    // socket.emit("test", { to: userSocketId, msg: "Hello" });
    createOffer(userSocketId);
  });
};

// Send signalling message:
export const sendSignallingMessage = (message: TSignallingMessage) => {
  if (!socket) return; //🚩 !socket
  // console.log("Sending signalling message: ", message);
  socket.emit(socketEvents.SIGNAL_MSG, message);
};

// Receive signalling message:
export const receiveSignallingMessage = () => {
  // console.log("Receiving signalling message", socket);
  socket.on(socketEvents.SIGNAL_MSG, handleSignallingMessage);
};
