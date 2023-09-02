"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandlers_1 = __importDefault(require("./app/middlewares/globalErrorHandlers"));
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Route
app.use('/api/v1/', routes_1.AppRoutes);
// Api route entry point
app.get('/', (req, res) => {
    const cowResponse = `
    <div style="text-align: center; font-family: Poppins, sans-serif;">
        <p style="font-size: 10rem;"> 🐄🤑🐂 </p>
        <p style="font-size: 35px;"> Welcome to Digital-Cow-Hut </p>
        <p style="font-size: 40px;"> AUTHENTICATION,   AUTHORIZATION </p>
    </div>
`;
    res.send(cowResponse);
});
// Global Error Handler
app.use(globalErrorHandlers_1.default);
// Not Found API Error
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found!',
        errorMessages: [{ path: req.originalUrl, message: 'API Not Found!' }],
    });
    next();
});
exports.default = app;
