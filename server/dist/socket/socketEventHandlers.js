"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountTestMessageEvent = exports.mountSendInCallMessageEvent = exports.mountSignallingMessageEvent = exports.mountLeaveCallEvent = exports.mountJoinCallEvent = exports.mountStartNewCallEvent = void 0;
const uuid_1 = require("uuid");
const socket_json_1 = __importDefault(require("../configs/socket.json"));
// Generate a unique call id with uuidv4() of length 10:
const createCall = () => {
    const callId = (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10);
    // 🚩
    //   1. check if the call id already exists in the database:
    //   2. if it does, then generate a new call id:
    // return callId;
    return "1234567890";
};
// Start a new call event:
const mountStartNewCallEvent = (socket) => {
    socket.on(socket_json_1.default.START_NEW_CALL, (data, callback) => {
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
exports.mountStartNewCallEvent = mountStartNewCallEvent;
// Join a call event:
const mountJoinCallEvent = (socket) => {
    socket.on(socket_json_1.default.JOIN_CALL, (data, callback) => {
        // 🚩 Check if the call exists in db:
        // If the call exists, then join the call:
        socket.join(data.callId);
        console.log(`User ${data.userSocketId} joined call ${data.callId}`);
        socket.to(data.callId).emit(socket_json_1.default.USER_JOINED, data.userSocketId);
        callback(socketResponse({
            status: "success",
            message: "Joined call successfully",
            data: null,
        }));
    });
};
exports.mountJoinCallEvent = mountJoinCallEvent;
// Leave a call event:
const mountLeaveCallEvent = (socket) => {
    socket.on(socket_json_1.default.LEAVE_CALL, (data) => {
        socket.leave(data.callId);
        console.log(`User ${data.userSocketId} left call ${data.callId}`);
        socket.to(data.callId).emit(socket_json_1.default.USER_LEFT, data.userSocketId);
    });
};
exports.mountLeaveCallEvent = mountLeaveCallEvent;
// Signalling message event:
const mountSignallingMessageEvent = (socket) => {
    socket.on(socket_json_1.default.SIGNAL_MSG, (data) => {
        socket.to(data.to).emit(socket_json_1.default.SIGNAL_MSG, data);
    });
};
exports.mountSignallingMessageEvent = mountSignallingMessageEvent;
// Send In Call messages:
const mountSendInCallMessageEvent = (io, socket) => {
    socket.on(socket_json_1.default.CHAT_MSG, (data) => {
        // Send the message to all the users in the room including the sender:
        io.to(data.room).emit(socket_json_1.default.CHAT_MSG, data);
    });
};
exports.mountSendInCallMessageEvent = mountSendInCallMessageEvent;
// Test Message:🚩
const mountTestMessageEvent = (socket) => {
    socket.on("test", (data) => {
        console.log("Test message: ", data);
        socket.to(data.to).emit("test", { ...data, from: socket.id });
    });
};
exports.mountTestMessageEvent = mountTestMessageEvent;
const socketResponse = ({ status, message, data }) => {
    return {
        status,
        message,
        data,
    };
};
