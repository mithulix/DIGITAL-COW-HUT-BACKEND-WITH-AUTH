import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

export const OrderGetRoutes = router.post(
  '/order-cow',
  OrderController.orderCow,
);

router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
