"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.httpServer.listen(port, () => {
    console.log(`Server running on Port: ${port} http://localhost:${port}`);
});
