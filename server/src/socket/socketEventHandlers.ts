import { Server, Socket } from "socket.io";
import AppError from "../utils/appError";
import { v4 as uuidv4 } from "uuid";
import socketEvents from "../configs/socket.json";
import {
  TCallbackResponse,
  TJoinCall,
  TCreateCall,
  TSignallingMessage,
  TChatMessage,
  TLeaveCall,
} from "../types/socketInterfaces";
import { createCall, getCallById } from "../services/call.services";

// Generate a unique call id with uuidv4() of length 10:
interface INewCall {
  callId: string;
  userId: string;
  createdAt: Date;
}
const createNewCall = async (userId: string): Promise<INewCall> => {
  const callId = uuidv4().replace(/-/g, "").slice(0, 10);

  //   1. check if the call id already exists in the database:
  const call = await getCallById(callId);
  //   2. if it does, then generate a new call id:
  if (call) {
    return await createNewCall(userId);
  }

  // Store the call id in the database:
  const newCall = await createCall({
    callId,
    userId,
  });

  // return callId;
  return newCall;
};

// Start a new call event:
export const mountStartNewCallEvent = (socket: Socket) => {
  socket.on(
    socketEvents.START_NEW_CALL,
    async (data: TCreateCall, callback: (res: TCallbackResponse) => void) => {
      const userId = socket.data.user.id;
      // Creata a new call:
      const callDetails = await createNewCall(userId);
      console.log("callDetails", callDetails);
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

// Join a call event:
export const mountJoinCallEvent = (socket: Socket) => {
  socket.on(
    socketEvents.JOIN_CALL,
    async (data: TJoinCall, callback: (res: TCallbackResponse) => void) => {
      // 🚩 Check if the call exists in db:
      const call = await getCallById(data.callId);
      console.log("call", call);

      // If the call does not exist, then send an error:
      if (!call) {
        return callback(
          socketResponse({
            status: "error",
            message: "Call does not exist",
            data: null,
          })
        );
      }

      // If the call exists, then join the call:
      data.user = {
        id: socket.data.user.id,
        name: socket.data.user.name,
      };
      socket.join(data.callId);
      console.log(
        `User ${data.user.id} : ${data.user.name} joined call ${data.callId}`
      );
      socket.to(data.callId).emit(socketEvents.USER_JOINED, {
        userSocketId: data.userSocketId,
        user: data.user,
      });

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

// Leave a call event:
export const mountLeaveCallEvent = (socket: Socket) => {
  socket.on(socketEvents.LEAVE_CALL, (data: TLeaveCall) => {
    socket.leave(data.callId);
    console.log(`User ${data.userSocketId} left call ${data.callId}`);
    socket.to(data.callId).emit(socketEvents.USER_LEFT, data.userSocketId);
  });
};

// Signalling message event:
export const mountSignallingMessageEvent = (socket: Socket) => {
  socket.on(socketEvents.SIGNAL_MSG, (data: TSignallingMessage) => {
    socket.to(data.to).emit(socketEvents.SIGNAL_MSG, data);
  });
};

// Send In Call messages:
export const mountSendInCallMessageEvent = (io: Server, socket: Socket) => {
  socket.on(socketEvents.CHAT_MSG, (data: TChatMessage) => {
    // Send the message to all the users in the room including the sender:
    io.to(data.room).emit(socketEvents.CHAT_MSG, data);
  });
};

// Test Message:🚩
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
