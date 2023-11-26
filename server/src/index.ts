import dotenv from "dotenv";
import cron from "node-cron";
import { removeOlderCalls } from "./utils/cron";

dotenv.config();

import { httpServer } from "./app";

// Schedule cron job to remove older calls every day at 12:00 AM:
cron.schedule("0 0 * * *", () => {
  removeOlderCalls();
});

// Uncaught exception handler:
process.on("uncaughtException", (err: any) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`Server running on Port: ${port} http://localhost:${port}`);
});

// Unhandled rejection handler:
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  httpServer.close(() => {
    process.exit(1);
  });
});
