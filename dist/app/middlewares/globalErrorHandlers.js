"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ApiError_1 = require("../../shared/errors/ApiError");
const error_handlers_1 = require("../../shared/errors/error.handlers");
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const globalErrorHandler = (error, req, res) => {
    let statusCode = 500;
    const success = false;
    let message = "Something went wrong!";
    let errorMessage = [];
    if (error.name == "ValidationError") {
        const simplifiedError = error_handlers_1.ErrorHandler.handleValidationError(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.name == "CastError") {
        const simplifiedError = error_handlers_1.ErrorHandler.handleCastError(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = error_handlers_1.ErrorHandler.handleZodError(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError_1.ApiError) {
        statusCode = 400;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        statusCode,
        success,
        message,
        errorMessage,
        stack: envConfig_1.default.NODE_ENV == "development" ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
