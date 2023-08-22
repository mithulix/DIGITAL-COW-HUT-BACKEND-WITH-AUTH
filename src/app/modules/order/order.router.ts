import express from 'express';
import { validateZodRequest } from '../../middlewares/validateZodRequest';
import { OrderController } from './order.controller';
import { OrderValidationSchema } from './order.validation';

const orderRouter = express.Router();

orderRouter.post(
  '/create-order',
  validateZodRequest(OrderValidationSchema.createOrderZodValidateSchema),
  OrderController.createOrder
);

orderRouter.get('/:id', OrderController.getSingleOrder);

orderRouter.get('/', OrderController.getAllOrders);

export const OrderRouter = orderRouter;