import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

import { globalErrorHandler } from "./controllers/error.controller";
import { initiateSocket } from "./socket/socketConfig";
import environment from "./configs/environment.json";
import { getUser } from "./services/user.services";
import { verifyJWT } from "./utils/jwt.utils";

import authRoutes from "./routes/auth.routes";

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socketInterfaces";
import { JwtPayload } from "jsonwebtoken";

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

// Socket Auth:
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  if (!token) {
    return next(new Error("Authentication error"));
  }

  // Verify token:
  const { id } = verifyJWT(token as string) as JwtPayload;
  if (!id) {
    return next(new Error("Authentication error"));
  }

  // Get user from db:
  const user = getUser(id);
  if (!user) {
    return next(new Error("Authentication error"));
  }

  // Add user to socket:
  socket.data.user = user;

  next();
});

// Set io to app instead of global:
app.set("io", io);

// Initialize the socket connection:
initiateSocket(io);

// Error handling middleware:
app.use(globalErrorHandler);
