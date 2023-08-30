/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../middlewares/catchAsync';
import { Request, Response } from 'express';
import { OrderService } from './order.services';
import httpStatus from 'http-status';
import { IUser } from '../users/user.interface';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';

const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    data,
  });
};

//----------order a new cow ----------------------------------
const orderCow = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.orderCow(req.body);
  sendUserResponse(res, ' Order is created  successfully', result);
});

//----------get all orders ----------------------------------
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendUserResponse(res, ' All Order are fetched successfully', result);
});

export const OrderController = {
  orderCow,
  getAllOrders,
};
