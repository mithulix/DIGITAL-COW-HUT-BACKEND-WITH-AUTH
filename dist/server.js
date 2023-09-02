"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const port = envConfig_1.default.port;
// Connect Database
mongoose_1.default
    .connect(envConfig_1.default.database_url)
    .then(() => console.log("😂 Database connected successfully...."))
    .catch((error) => console.log(`Unable to connect MongoDB: ${error}`));
// Listen to Server
const server = app_1.default.listen(port, () => {
    console.log(`🐳 Server is running on port: ${port}`);
});
// Unhandled Rejection: Gracefully off the server
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled rejection : ${error}`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
