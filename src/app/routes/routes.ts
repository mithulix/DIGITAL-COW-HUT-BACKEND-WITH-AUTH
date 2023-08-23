import express from 'express';
import { CowRoutes } from '../modules/cows/cow.router';
import { UserRoutes } from '../modules/users/user.route';

const appRouter = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  // {
  //   path: '/orders',
  //   route: OrderRoutes,
  // },
];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));

export default appRouter;
