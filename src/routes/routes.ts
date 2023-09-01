import express from 'express';
import { UserRoutes } from '../app/modules/users/user.route';
import { CowRoutes } from '../app/modules/cows/cow.route';
import { OrderRoutes } from '../app/modules/orders/order.route';
import { SellerRoutes } from '../app/modules/seller/seller.route';
import { BuyerRoutes } from '../app/modules/buyer/buyer.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
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
