import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { initiateSocket } from "./src/socket/socketConfig.js";

// Express setup:
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>This is the server for peer to peer video communication</h1>");
});

// Socket setup:
export const httpServer = createServer(app);
const io = new Server(httpServer);

// Set io to app instead of global:
app.set("io", io);

// Initialize the socket connection:
initiateSocket(io);
