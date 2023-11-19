import { Request } from "express";
import { Server, Socket } from "socket.io";
import {
  mountJoinCallEvent,
  mountStartNewCallEvent,
  mountSignallingMessageEvent,
  mountTestMessageEvent,
  mountSendInCallMessageEvent,
  mountLeaveCallEvent,
} from "./socketEventHandlers";

// Util used to initiate and mount socket events:
const initiateSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`a user connected : ${socket.id}`);
    // socket.emit("HELLO", "Hello from server " + socket.id);
    // Join a private room:
    socket.join(socket.id);

    mountJoinCallEvent(socket);
    mountStartNewCallEvent(socket);
    mountSignallingMessageEvent(socket);
    mountSendInCallMessageEvent(io, socket);
    mountTestMessageEvent(socket);
    mountLeaveCallEvent(socket);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
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
