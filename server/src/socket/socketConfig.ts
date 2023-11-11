import { Request } from "express";
import { Server, Socket } from "socket.io";
import socketConfig from "../configs/socket.json";
import { IJoinCall } from "../interfaces/socketInterfaces";

const mountJoinCallEvent = (io: Server, socket: Socket) => {
  socket.on(socketConfig.JOIN_CALL, (data: IJoinCall) => {
    console.log("JOIN_CALL", data);
    socket.join(data.callId);
    socket.to(data.callId).emit(socketConfig.USER_JOINED, data.userSocketId);
  });
};

// Util used to initiate and mount socket events:
const initiateSocket = (io: Server) => {
  console.log("Initiating socket connection");
  io.on("connection", (socket: Socket) => {
    console.log(`a user connected : ${socket.id}`);
    // socket.emit("HELLO", "Hello from server " + socket.id);

    mountJoinCallEvent(io, socket);

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
