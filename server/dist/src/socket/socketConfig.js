"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocketEvent = exports.initiateSocket = void 0;
const socket_json_1 = __importDefault(require("../configs/socket.json"));
const mountJoinCallEvent = (io, socket) => {
    socket.on(socket_json_1.default.JOIN_CALL, (data) => {
        console.log("JOIN_CALL", data);
        socket.join(data.callId);
        socket.to(data.callId).emit(socket_json_1.default.USER_JOINED, data.userSocketId);
    });
};
// Util used to initiate and mount socket events:
const initiateSocket = (io) => {
    console.log("Initiating socket connection");
    io.on("connection", (socket) => {
        console.log(`a user connected : ${socket.id}`);
        // socket.emit("HELLO", "Hello from server " + socket.id);
        mountJoinCallEvent(io, socket);
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};
exports.initiateSocket = initiateSocket;
// Util used to send socket events:
const emitSocketEvent = (req, roomId, event, data) => {
    req.app.get("io").to(roomId).emit(event, data);
};
exports.emitSocketEvent = emitSocketEvent;
