import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import AppError from "./utils/appError";
import { JwtPayload } from "jsonwebtoken";
import { verifyJWT } from "./utils/jwt.utils";
import { initiateSocket } from "./socket/socketConfig";
import { globalErrorHandler } from "./controllers/error.controller";
import environment from "./configs/environment.json";
import { getUser } from "./services/user.services";

import authRoutes from "./routes/auth.routes";

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socket.types";

// Express setup:
const app = express();

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Security setup:
// app.enable("trust proxy");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(hpp());

app.use(compression());

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

// 404 error handler:
app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
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
