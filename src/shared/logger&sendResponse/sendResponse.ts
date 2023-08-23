import { Response } from 'express';
import { IApiResponse } from '../interfaces/common.interface';

const sendResponse = <T>(res: Response, responseData: IApiResponse<T>) => {
  const response: IApiResponse<T> = {
    statusCode: responseData.statusCode,
    success: responseData.success,
    message: responseData.message,
    meta: responseData.meta,
    data: responseData.data,
  };
  res.status(responseData.statusCode).json(response);
};

export default sendResponse;
