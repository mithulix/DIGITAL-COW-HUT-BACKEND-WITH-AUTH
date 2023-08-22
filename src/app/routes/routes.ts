import express, { Router } from 'express';
import { UserRouter } from "../modules/users/user.route";

const appRouter = express.Router();

const routes = [
    {
        path: '/users',
        router: UserRouter,
    },
    {
        path:'/cows',
        router: CowsRouter,
    },
    {
        path:'/orders',
        router: OrderRouter,
    }
];

routes.forEach((el: { path: string; route: Router }) =>
  appRouter.use(el.path, el.route)
);

export default appRouter;