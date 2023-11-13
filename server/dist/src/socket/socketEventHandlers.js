"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountStartNewCallEvent = exports.mountJoinCallEvent = void 0;
const uuid_1 = require("uuid");
const socket_json_1 = __importDefault(require("../configs/socket.json"));
const createCall = () => {
    // generae a unique call id with uuidv4() of length 10:
    const callId = (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10);
    //   1. check if the call id already exists in the database:
    //   2. if it does, then generate a new call id:
    return callId;
};
// Join a call event:
const mountJoinCallEvent = (io, socket) => {
    socket.on(socket_json_1.default.JOIN_CALL, (data, callback) => {
        // Check if the call exists in db:
        socket.join(data.callId);
        socket.to(data.callId).emit(socket_json_1.default.USER_JOINED, data.userSocketId);
        callback(socketResponse({
            status: "success",
            message: "Joined call successfully",
            data: null,
        }));
    });
};
exports.mountJoinCallEvent = mountJoinCallEvent;
// Start a new call event:
const mountStartNewCallEvent = (io, socket) => {
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
const socketResponse = ({ status, message, data }) => {
    return {
        status,
        message,
        data,
    };
};
