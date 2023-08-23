// import DailyRotateFile from 'winston-daily-rotate-file';
// import { createLogger, format, transports } from 'winston';
// const { combine, timestamp, label, printf, prettyPrint } = format;
// import path from 'path';

// //--------custom log format for daily rotation file---------------------------------
// const myFormat = printf(({ level, message, label, timestamps }) => {
//   const date = new Date(timestamps);
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   const seconds = date.getSeconds();
//   return `${date.toDateString()} ${hour}:${minute}:${seconds} [${label}] ${level}: ${message} `;
// });

// //-----create a logger for debugging purposes ------------------------------------------
// const logger = createLogger({
//   level: 'info',
//   format: combine(
//     label({ label: 'log' }),
//     timestamp(),
//     myFormat,
//     prettyPrint(),
//   ),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'successes',
//         'UM-S-%DATE%-success.log',
//       ),
//       datePattern: 'YYYY-MM-DD HH:mm:ss UTC',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// //------- errorLogger --------------------------------
// const errorLogger = createLogger({
//   level: 'error',
//   format: combine(label({ label: 'errorlog' }), timestamp(), myFormat),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'errors',
//         'UM-Er-%DATE%-error.log',
//       ),
//       datePattern: 'YYYY-MM-DD HH:mm:ss UTC',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '15d',
//     }),
//   ],
// });

// export { logger, errorLogger };
