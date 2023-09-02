import express from 'express';
import {
  SignUpBuyerRoutes,
  SignUpSellerRoutes,
  UserRoutes,
} from '../app/modules/users/user.route';
import { CowRoutes } from '../app/modules/cows/cow.route';
import { OrderRoutes } from '../app/modules/orders/order.route';
import { SellerRoutes } from '../app/modules/seller/seller.route';
import { BuyerRoutes } from '../app/modules/buyer/buyer.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { AdminRoutes } from '../app/modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/signup',
    route: SignUpSellerRoutes,
  },

  {
    path: '/auth/signup',
    route: SignUpBuyerRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/buyers',
    route: BuyerRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const AppRoutes = router;
