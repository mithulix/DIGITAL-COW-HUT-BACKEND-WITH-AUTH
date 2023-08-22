import {Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import { pick } from '../../../shared/pagination/pick';
import { catchAsync } from '../../middlewares/catchAsync';

import { OrderService } from './order.service';

//------create a new order--------------------------------
const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const order = req.body;

    const result = await OrderService.createOrder(order);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order placed successfully',
      data: result,
    });
  }
);

//------get all orders--------------------------------
const getAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await OrderService.getAllOrders(paginationOptions);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Orders retrieved successfully' : 'No Orders found',
      meta: result.meta,
      data: result.data,
    });
  }
);

//------get a single order--------------------------------
const getSingleOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await OrderService.getSingleOrder(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: order ? 'Orders retrieved successfully' : 'No Orders found',
      data: order,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};