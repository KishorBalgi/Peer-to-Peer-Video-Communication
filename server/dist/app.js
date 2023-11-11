"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const socketConfig_js_1 = require("./src/socket/socketConfig.js");
const environment_json_1 = __importDefault(require("./src/configs/environment.json"));
// Express setup:
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS setup:
const allowedOrigin = process.env.NODE_ENV === "production"
    ? environment_json_1.default.client_prod
    : environment_json_1.default.client_dev;
console.log("Allowed Origins:", allowedOrigin);
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true,
}));
app.get("/", (req, res, next) => {
    res.send("<h1>This is the server for peer to peer video communication</h1>");
});
// Socket setup:
exports.httpServer = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(exports.httpServer, {
    cors: {
        origin: allowedOrigin,
        credentials: true,
    },
});
// Set io to app instead of global:
app.set("io", io);
// Initialize the socket connection:
(0, socketConfig_js_1.initiateSocket)(io);
