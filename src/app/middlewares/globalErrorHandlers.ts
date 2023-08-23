import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config/envConfig';
import ApiError from '../../shared/errors/ApiError';
import { ErrorHandlers } from '../../shared/errors/error.handlers';
import { IGenericErrorMessage } from '../../shared/errors/typeError';

const globalErrorHandlers: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : console.log(
        `🐱‍🏍 globalErrorHandler ~~, ${JSON.stringify(error)}`,
      );

  let statusCode = 500;
  const success = false;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = ErrorHandlers.handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = ErrorHandlers.handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = ErrorHandlers.handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = 400;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error?.message
      },
    ];
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandlers;
