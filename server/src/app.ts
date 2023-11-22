import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

import { initiateSocket } from "./socket/socketConfig";
import environment from "./configs/environment.json";

import authRoutes from "./routes/auth.routes";

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socketInterfaces";

// Express setup:
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

// Routes:
app.use("/api/v1/auth", authRoutes);

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
