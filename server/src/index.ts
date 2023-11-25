import dotenv from "dotenv";
import cron from "node-cron";
import { removeOlderCalls } from "./utils/cron";

dotenv.config();

import { httpServer } from "./app";

// Schedule cron job to remove older calls every day at 12:00 AM:
cron.schedule("0 0 * * *", () => {
  removeOlderCalls();
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server running on Port: ${port} http://localhost:${port}`);
});
