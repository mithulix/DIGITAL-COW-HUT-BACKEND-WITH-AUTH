"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_router_1 = require("../modules/cows/cow.router");
const order_router_1 = require("../modules/order/order.router");
const user_route_1 = require("../modules/users/user.route");
const appRouter = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_router_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_router_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
exports.default = appRouter;
