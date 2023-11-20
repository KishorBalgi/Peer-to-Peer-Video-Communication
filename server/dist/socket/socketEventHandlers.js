import { v4 as uuidv4 } from "uuid";
import socketEvents from "../configs/socket.json";
// Generate a unique call id with uuidv4() of length 10:
const createCall = () => {
    const callId = uuidv4().replace(/-/g, "").slice(0, 10);
    // 🚩
    //   1. check if the call id already exists in the database:
    //   2. if it does, then generate a new call id:
    // return callId;
    return "1234567890";
};
// Start a new call event:
export const mountStartNewCallEvent = (socket) => {
    socket.on(socketEvents.START_NEW_CALL, (data, callback) => {
        // Creata a new call:
        const callDetails = {
            callId: createCall(),
        };
        // Send the call details to the client:
        callback(socketResponse({
            status: "success",
            message: "Created new call successfully",
            data: callDetails,
        }));
    });
};
// Join a call event:
export const mountJoinCallEvent = (socket) => {
    socket.on(socketEvents.JOIN_CALL, (data, callback) => {
        // 🚩 Check if the call exists in db:
        // If the call exists, then join the call:
        socket.join(data.callId);
        console.log(`User ${data.userSocketId} joined call ${data.callId}`);
        socket.to(data.callId).emit(socketEvents.USER_JOINED, data.userSocketId);
        callback(socketResponse({
            status: "success",
            message: "Joined call successfully",
            data: null,
        }));
    });
};
// Leave a call event:
export const mountLeaveCallEvent = (socket) => {
    socket.on(socketEvents.LEAVE_CALL, (data) => {
        socket.leave(data.callId);
        console.log(`User ${data.userSocketId} left call ${data.callId}`);
        socket.to(data.callId).emit(socketEvents.USER_LEFT, data.userSocketId);
    });
};
// Signalling message event:
export const mountSignallingMessageEvent = (socket) => {
    socket.on(socketEvents.SIGNAL_MSG, (data) => {
        socket.to(data.to).emit(socketEvents.SIGNAL_MSG, data);
    });
};
// Send In Call messages:
export const mountSendInCallMessageEvent = (io, socket) => {
    socket.on(socketEvents.CHAT_MSG, (data) => {
        // Send the message to all the users in the room including the sender:
        io.to(data.room).emit(socketEvents.CHAT_MSG, data);
    });
};
// Test Message:🚩
export const mountTestMessageEvent = (socket) => {
    socket.on("test", (data) => {
        console.log("Test message: ", data);
        socket.to(data.to).emit("test", { ...data, from: socket.id });
    });
};
const socketResponse = ({ status, message, data }) => {
    return {
        status,
        message,
        data,
    };
};
