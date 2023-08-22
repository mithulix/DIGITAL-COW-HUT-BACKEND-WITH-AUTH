import { config } from 'dotenv';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ApiError from '../../errors/ApiError';
import handleZodError from '../../errors/handleZodError';
import { errorLogger } from '../../shared/logger';

const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('error from global error handler: ', error)
    : errorLogger.error('error from global error handler', error);

    let statusCode = 500;
    let message = 'something went wrong !';
    let errorMessages: IgenericErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessages = error?.message
        ? [
            {
                path: '',
                message: error?.message,
            },
        ]: [];
    }else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
        ?[
            {
                path: '',
                message: error?.message,
            }
        ]:[];
    };


    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? error?.stack : undefined,
    })
    next();
};


export default globalErrorHandlers;