"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlers = void 0;
const http_status_1 = __importDefault(require("http-status"));
//----handle Validation Error --------------------------------
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorMessages: errors,
    };
};
//----handle Zod Error --------------------------------
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Zod error",
        errorMessages: errors,
    };
};
//----handle Cast Error --------------------------------
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: error.message
        }
    ];
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Validation failed',
        errorMessages: errors,
    };
};
exports.ErrorHandlers = {
    handleValidationError,
    handleZodError,
    handleCastError
};
