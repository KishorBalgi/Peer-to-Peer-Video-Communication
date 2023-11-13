"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocketEvent = exports.initiateSocket = void 0;
const socketEventHandlers_1 = require("./socketEventHandlers");
// Util used to initiate and mount socket events:
const initiateSocket = (io) => {
    console.log("Initiating socket connection");
    io.on("connection", (socket) => {
        console.log(`a user connected : ${socket.id}`);
        // socket.emit("HELLO", "Hello from server " + socket.id);
        (0, socketEventHandlers_1.mountJoinCallEvent)(io, socket);
        (0, socketEventHandlers_1.mountStartNewCallEvent)(io, socket);
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
