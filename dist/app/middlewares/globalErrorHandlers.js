"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const ApiError_1 = __importDefault(require("../../shared/errors/ApiError"));
const error_handlers_1 = require("../../shared/errors/error.handlers");
const globalErrorHandlers = (error, req, res) => {
    envConfig_1.default.env === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
        : console.log(`🐱‍🏍 globalErrorHandler ~~, ${JSON.stringify(error)}`);
    let statusCode = 500;
    const success = false;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if (error.name === 'ValidationError') {
        const simplifiedError = error_handlers_1.ErrorHandlers.handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = error_handlers_1.ErrorHandlers.handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = error_handlers_1.ErrorHandlers.handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = 400;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
        errorMessages = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message
            },
        ];
    }
    res.status(statusCode).json({
        statusCode,
        success,
        message,
        errorMessages,
        stack: envConfig_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandlers;
