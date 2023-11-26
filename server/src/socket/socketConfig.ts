import { Request } from "express";
import { Server, Socket } from "socket.io";
import {
  mountJoinCallEvent,
  mountStartNewCallEvent,
  mountSignallingMessageEvent,
  mountSendInCallMessageEvent,
  mountLeaveCallEvent,
  mountCheckCallExistsEvent,
} from "./socketEventHandlers";
import AppError from "../utils/appError";

// Util used to initiate and mount socket events:
const initiateSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    try {
      console.log(`a user connected : ${socket.id}`);
      // Join a private room:
      socket.join(socket.id);

      // Mount socket events:
      mountJoinCallEvent(socket);
      mountCheckCallExistsEvent(socket);
      mountStartNewCallEvent(socket);
      mountSignallingMessageEvent(socket);
      mountSendInCallMessageEvent(io, socket);
      mountLeaveCallEvent(socket);

      // Handle socket disconnection:
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    } catch (err: any) {
      throw new AppError(500, err.message);
    }
  });
};

// Util used to send socket events:
const emitSocketEvent = (
  req: Request,
  roomId: string,
  event: string,
  data: any
) => {
  req.app.get("io").to(roomId).emit(event, data);
};

export { initiateSocket, emitSocketEvent };
