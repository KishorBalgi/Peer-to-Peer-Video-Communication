import dotenv from "dotenv";
dotenv.config();
import { httpServer } from "./app";
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log(`Server running on Port: ${port} http://localhost:${port}`);
});
