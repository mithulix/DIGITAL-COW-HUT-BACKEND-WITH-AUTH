import mongoose from 'mongoose';
import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage, IGenericErrorResponse } from './typeError';
import httpStatus from 'http-status';


//----handle Validation Error --------------------------------
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors,
  };
};

//----handle Zod Error --------------------------------
const handleZodError = (error: ZodError) => {
    const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: "Zod error",
        errorMessages: errors,
    }
};

//----handle Cast Error --------------------------------
const handleCastError = (error: mongoose.Error.CastError) => {
    const errors = [
        {
            path:error.path,
            message: error.message
        }
    ];

    return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errorMessages: errors,
    }
};

export const ErrorHandlers = {
    handleValidationError,
    handleZodError,
    handleCastError
};