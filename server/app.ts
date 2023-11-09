import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>This is the server for peer to peer video communication</h1>");
});

// Set io to app:
app.set("io", io);
