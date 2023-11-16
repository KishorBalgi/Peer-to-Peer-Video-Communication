import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import socketEvents from "../configs/socket.json";
import {
  TCallbackResponse,
  TJoinCall,
  TCreateCall,
  TSignallingMessage,
} from "../types/socketInterfaces";

const createCall = () => {
  // generae a unique call id with uuidv4() of length 10:
  const callId = uuidv4().replace(/-/g, "").slice(0, 10);

  //   1. check if the call id already exists in the database:
  //   2. if it does, then generate a new call id:

  return callId;
};

// Join a call event:
export const mountJoinCallEvent = (io: Server, socket: Socket) => {
  socket.on(
    socketEvents.JOIN_CALL,
    (data: TJoinCall, callback: (res: TCallbackResponse) => void) => {
      // Check if the call exists in db:

      socket.join(data.callId);
      console.log(`User ${data.userSocketId} joined call ${data.callId}`);
      socket.to(data.callId).emit(socketEvents.USER_JOINED, socket.id);

      callback(
        socketResponse({
          status: "success",
          message: "Joined call successfully",
          data: null,
        })
      );
    }
  );
};

// Start a new call event:
export const mountStartNewCallEvent = (io: Server, socket: Socket) => {
  socket.on(
    socketEvents.START_NEW_CALL,
    (data: TCreateCall, callback: (res: TCallbackResponse) => void) => {
      // Creata a new call:
      const callDetails = {
        callId: createCall(),
      };

      // Send the call details to the client:
      callback(
        socketResponse({
          status: "success",
          message: "Created new call successfully",
          data: callDetails,
        })
      );
    }
  );
};

// Signalling message event:
export const mountSignallingMessageEvent = (io: Server, socket: Socket) => {
  socket.on(socketEvents.SEND_SIGNAL, (data: TSignallingMessage) => {
    // console.log("Signalling message: ", data);
    socket
      .to(data.to)
      .emit(socketEvents.RECEIVE_SIGNAL, { ...data, to: socket.id });
  });
};

const socketResponse = ({ status, message, data }: TCallbackResponse) => {
  return {
    status,
    message,
    data,
  };
};
