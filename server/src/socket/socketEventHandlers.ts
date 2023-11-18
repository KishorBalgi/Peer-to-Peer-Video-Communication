import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import socketEvents from "../configs/socket.json";
import {
  TCallbackResponse,
  TJoinCall,
  TCreateCall,
  TSignallingMessage,
  TChatMessage,
} from "../types/socketInterfaces";

const createCall = () => {
  // generae a unique call id with uuidv4() of length 10:
  const callId = uuidv4().replace(/-/g, "").slice(0, 10);

  //   1. check if the call id already exists in the database:
  //   2. if it does, then generate a new call id:

  // return callId;
  return "1234567890";
};

// Join a call event:
export const mountJoinCallEvent = (socket: Socket) => {
  socket.on(
    socketEvents.JOIN_CALL,
    (data: TJoinCall, callback: (res: TCallbackResponse) => void) => {
      // Check if the call exists in db:

      socket.join(data.callId);
      console.log(`User ${data.userSocketId} joined call ${data.callId}`);
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
export const mountStartNewCallEvent = (socket: Socket) => {
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
export const mountSignallingMessageEvent = (socket: Socket) => {
  socket.on(socketEvents.SIGNAL_MSG, (data: TSignallingMessage) => {
    if (data.type !== "candidate")
      console.log("Signalling message: ", {
        type: data.type,
        from: data.from,
        room: data.room,
        to: data.to,
        id: socket.id,
      });

    socket.to(data.room).to(data.to).emit(socketEvents.SIGNAL_MSG, data);
  });
};

// Send In Call messages:
export const mountSendInCallMessageEvent = (io: Server, socket: Socket) => {
  socket.on(socketEvents.CHAT_MSG, (data: TChatMessage) => {
    // Send the message to all the users in the room including the sender:
    io.to(data.room).emit(socketEvents.CHAT_MSG, data);
  });
};

// Test Message:
export const mountTestMessageEvent = (socket: Socket) => {
  socket.on("test", (data: any) => {
    console.log("Test message: ", data);

    socket.to(data.to).emit("test", { ...data, from: socket.id });
  });
};

const socketResponse = ({ status, message, data }: TCallbackResponse) => {
  return {
    status,
    message,
    data,
  };
};
