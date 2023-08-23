import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import pick from '../../../shared/pagination/pick';
import catchAsync from '../../middlewares/catchAsync';
import { IOrder } from './order.interface';
import { OrderService } from './order.services';

//-------create a new order--------------------------------
const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order data created Successfully!',
    data: result,
  });
});

//-------get all  orders--------------------------------
const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrders(paginationOptions);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders Retrieved Successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//-------get a single order--------------------------------
const getOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderService.getOrder(id);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order  Retrieved Successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrder,
};
