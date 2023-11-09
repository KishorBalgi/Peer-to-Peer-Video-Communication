"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
exports.httpServer = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(exports.httpServer);
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    res.send("<h1>This is the server for peer to peer video communication</h1>");
});
// Set io to app:
app.set("io", io);
