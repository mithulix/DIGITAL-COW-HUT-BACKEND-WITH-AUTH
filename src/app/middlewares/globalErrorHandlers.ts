import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../../shared/errors/ApiError';
import { ErrorHandler } from '../../shared/errors/error.handlers';
import { IErrorMessage } from '../../shared/errors/typeError';
import config from '../../config/envConfig';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  const success = false;
  let message = 'Something went wrong!';
  let errorMessage: IErrorMessage[] = [];
  if (error.name == 'ValidationError') {
    const simplifiedError = ErrorHandler.handleValidationError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error.name == 'CastError') {
    const simplifiedError = ErrorHandler.handleCastError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = ErrorHandler.handleZodError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = 400;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    errorMessage,
    stack: config.env == 'development' ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
