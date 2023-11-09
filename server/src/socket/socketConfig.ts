import { Request } from "express";
import { Server, Socket } from "socket.io";
import socketConfig from "../configs/socket.json";

// Util used to initiate and mount socket events:
const initiateSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`a user connected : ${socket.id}`);
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
