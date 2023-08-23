import express from 'express';
import { CowRoutes } from '../app/module/cow/cow.route';
import { OrderRoutes } from '../app/module/orders/order.route';
import { UserRoutes } from '../app/module/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
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
