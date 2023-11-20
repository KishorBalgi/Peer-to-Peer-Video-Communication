import { mountJoinCallEvent, mountStartNewCallEvent, mountSignallingMessageEvent, mountTestMessageEvent, mountSendInCallMessageEvent, mountLeaveCallEvent, } from "./socketEventHandlers";
// Util used to initiate and mount socket events:
const initiateSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`a user connected : ${socket.id}`);
        // Join a private room:
        socket.join(socket.id);
        // Mount socket events:
        mountJoinCallEvent(socket);
        mountStartNewCallEvent(socket);
        mountSignallingMessageEvent(socket);
        mountSendInCallMessageEvent(io, socket);
        mountTestMessageEvent(socket);
        mountLeaveCallEvent(socket);
        // Handle socket disconnection:
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};
// Util used to send socket events:
const emitSocketEvent = (req, roomId, event, data) => {
    req.app.get("io").to(roomId).emit(event, data);
};
export { initiateSocket, emitSocketEvent };
