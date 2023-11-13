import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import socketEvents from "../configs/socket.json";
import {
  ICallbackResponse,
  IJoinCall,
  ICreateCall,
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
    (data: IJoinCall, callback: (res: ICallbackResponse) => void) => {
      // Check if the call exists in db:

      socket.join(data.callId);
      socket.to(data.callId).emit(socketEvents.USER_JOINED, data.userSocketId);

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
    (data: ICreateCall, callback: (res: ICallbackResponse) => void) => {
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

const socketResponse = ({ status, message, data }: ICallbackResponse) => {
  return {
    status,
    message,
    data,
  };
};
