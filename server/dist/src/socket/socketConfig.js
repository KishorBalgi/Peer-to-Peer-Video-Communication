"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocketEvent = exports.initiateSocket = void 0;
// Util used to initiate and mount socket events:
const initiateSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`a user connected : ${socket.id}`);
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
