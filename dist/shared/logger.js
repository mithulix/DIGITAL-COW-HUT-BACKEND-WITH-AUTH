"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_1 = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const path_1 = __importDefault(require("path"));
//--------custom log format for daily rotation file---------------------------------
const myFormat = printf(({ level, message, label, timestamps }) => {
    const date = new Date(timestamps);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minute}:${seconds} [${label}] ${level}: ${message} `;
});
//-----create a logger for debugging purposes ------------------------------------------
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'log' }), timestamp(), myFormat, prettyPrint()),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'UM-S-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD HH:mm:ss UTC',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.logger = logger;
//------- errorLogger --------------------------------
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'errorlog' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'UM-Er-%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD HH:mm:ss UTC',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '15d',
        }),
    ],
});
exports.errorLogger = errorLogger;
