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

import authRoutes from "./routes/auth.routes";

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socketInterfaces";
import { JwtPayload } from "jsonwebtoken";
import AppError from "./utils/appError";

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
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie?.split("=")[1];
    if (!token) {
      return new Error("Authentication error");
    }

    // Verify token:
    const { id } = verifyJWT(token as string) as JwtPayload;
    if (!id) {
      return new Error("Authentication error");
    }

    // Get user from db:
    const user = await getUser(id);
    if (!user) {
      return new Error("Authentication error");
    }

    // Add user to socket:
    socket.data.user = user;
    next();
  } catch (err: any) {
    return next(new AppError(401, err.message));
  }
});

// Set io to app instead of global:
app.set("io", io);

// Initialize the socket connection:
initiateSocket(io);

// Error handling middleware:
app.use(globalErrorHandler);
