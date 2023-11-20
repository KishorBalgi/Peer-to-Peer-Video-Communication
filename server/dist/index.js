"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.httpServer.listen(port, () => {
    console.log(`Server running on Port: ${port} http://localhost:${port}`);
});
