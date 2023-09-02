import { ZodError } from 'zod';
import { Error } from 'mongoose';
import { IErrorMessage, IErrorResponse } from './typeError';

//----handle Validation Error --------------------------------
const handleValidationError = (
  error: Error.ValidationError,
): IErrorResponse => {
  const errorMessage: IErrorMessage[] = Object.values(error.errors).map(
    error => ({ path: error.path, message: error.message }),
  );

  const status = 400;
  const message = error.message;
  return { status, message, errorMessage };
};

//----handle Zod Error --------------------------------
const handleZodError = (error: ZodError): IErrorResponse => {
  const errorMessage: IErrorMessage[] = error.issues.map(issue => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  const status = 400;
  const message = 'Validation Error';

  return { status, message, errorMessage };
};

//----handle Cast Error --------------------------------
const handleCastError = (error: Error.CastError): IErrorResponse => {
  const errorMessage: IErrorMessage[] = [
    { path: error.path, message: error.message },
  ];

  const status = 400;
  const message = 'Invalid ID';

  return { status, message, errorMessage };
};

export const ErrorHandler = {
  handleValidationError,
  handleZodError,
  handleCastError,
};
