import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

import { initiateSocket } from "./socket/socketConfig";
import environment from "./configs/environment.json";

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socketInterfaces.js";

// Express setup:
const app = express();

app.use(express.json());

// CORS setup:
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? environment.client_prod
    : environment.client_dev;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("<h1>This is the server for peer to peer video communication</h1>");
});

// Socket setup:
export const httpServer = createServer(app);

const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
  },
});

// Set io to app instead of global:
app.set("io", io);

// Initialize the socket connection:
initiateSocket(io);
