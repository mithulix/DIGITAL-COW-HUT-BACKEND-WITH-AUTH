import express from 'express';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

router.post(
  '/',
  validateZodRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder,
);

router.get('/', OrderController.getAllOrders);

router.get('/:id', OrderController.getOrder);

export const OrderRoutes = router;
