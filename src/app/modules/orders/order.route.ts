import express from 'express';
import { OrderController } from './order.controller';
import auth from '../auth/auth';
import { ENUM_USER_ROLE } from '../../../enum/userEnum';

const router = express.Router();

router.post(
  '/order-cow', 
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.orderCow
  );

router.get(
    '/orders/:id',
    auth(
      ENUM_USER_ROLE.SELLER,
      ENUM_USER_ROLE.BUYER,
      ENUM_USER_ROLE.ADMIN
      ),
    OrderController.getAllOrders
);

router.get(
    '/', auth(
      ENUM_USER_ROLE.SELLER, 
      ENUM_USER_ROLE.BUYER, 
      ENUM_USER_ROLE.ADMIN
      ),
    OrderController.getAllOrders
);

export const OrderRoutes = router;
