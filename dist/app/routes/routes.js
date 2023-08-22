"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const appRouter = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        router: user_route_1.UserRouter,
    },
    // {
    //     path:'/cows',
    //     router: CowsRouter,
    // },
    // {
    //     path:'/orders',
    //     router: OrderRouter,
    // }
];
moduleRoutes.forEach(route => appRouter.use(route.path, route.router));
exports.default = appRouter;
