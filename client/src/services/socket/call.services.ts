import { useRouter } from "next/navigation";
import { toastLoading, toastUpdate } from "@/components/Notifications/toasts";

import { initLocalStream } from "@/services/webRTC/init";
import {
  handleSignallingMessage,
  createOffer,
  userLeftCallHandler,
} from "../webRTC/peerConnection";

import { socket } from "./socket.services";
import socketEvents from "@/configs/socket.json";
import { TCallbackResponse, TUserJoined } from "@/types/socket";
import { TSignallingMessage } from "@/types/socket";

// Initiate a new call:
export const initNewCall = (navigate: ReturnType<typeof useRouter>) => {
  if (!socket) return;
  const loadingToastId = toastLoading("Starting a new call...");

  // Emit start new call event:
  socket.emit(
    socketEvents.START_NEW_CALL,
    { userSocketId: socket.id },
    (res: TCallbackResponse) => {
      if (res.status === "success") {
        toastUpdate(loadingToastId, "success", "Call started!", false);
        return navigate.push(`/${res.data.callId}`);
      }
      toastUpdate(loadingToastId, "error", res.message, false);
    }
  );
};

// Join an existing call:
export const joinExistingCall = (
  callId: string,
  navigate: ReturnType<typeof useRouter>
) => {
  if (!socket) return;

  const loadingToastId = toastLoading("Joining call...");

  // Check if the call exists:
  socket.emit(
    socketEvents.CHECK_CALL_EXISTS,
    callId,
    async (res: TCallbackResponse) => {
      if (res.status === "error") {
        toastUpdate(loadingToastId, "error", res.message, false);
        return navigate.push("/");
      }
      // If call exist, Init local stream:
      await initLocalStream();

      // Join call:
      socket.emit(
        socketEvents.JOIN_CALL,
        {
          callId,
          userSocketId: socket.id,
        },
        (res: TCallbackResponse) => {
          if (res.status === "error") {
            toastUpdate(loadingToastId, "error", res.message, false);
            return navigate.push("/");
          }
          toastUpdate(loadingToastId, "success", "You joined", false);
          socket.callId = callId;
        }
      );
    }
  );
};

// New user joined the call:
export const newUserJoinedCall = () => {
  socket.on(socketEvents.USER_JOINED, (data: TUserJoined) => {
    // Create offer for the new user:
    createOffer(data);
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
    userLeftCallHandler(userSocketId);
  });
};

// Send signalling message:
export const sendSignallingMessage = (message: TSignallingMessage) => {
  if (!socket) return;
  socket.emit(socketEvents.SIGNAL_MSG, message);
};

// Receive signalling message:
export const receiveSignallingMessage = () => {
  socket.on(socketEvents.SIGNAL_MSG, handleSignallingMessage);
};
