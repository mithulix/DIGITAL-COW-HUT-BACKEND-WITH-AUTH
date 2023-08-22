import express from 'express';
import { CowRouter } from '../modules/cows/cow.router';
import { UserRouter } from "../modules/users/user.route";

const appRouter = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        router: UserRouter,
    },
    {
        path:'/cows',
        router: CowRouter,
    },
    // {
    //     path:'/orders',
    //     router: OrderRouter,
    // }
];

moduleRoutes.forEach(route => appRouter.use(route.path, route.router)); 

export default appRouter;