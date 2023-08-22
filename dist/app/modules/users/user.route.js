"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const userRouter = express_1.default.Router();
userRouter.get('/', user_controller_1.UserController.getAllUsers);
userRouter.patch('/:id', (0, validateZodRequest_1.validateZodRequest)(user_validation_1.UserValidation.updateZodValidateSchema), user_controller_1.UserController.updateUser);
userRouter.get('/:id', user_controller_1.UserController.getSingleUser);
userRouter.delete('/:id', user_controller_1.UserController.deleteUser);
userRouter.post('/signup', (0, validateZodRequest_1.validateZodRequest)(user_validation_1.UserValidation.createUserZodValidateSchema), user_controller_1.UserController.createUser);
exports.UserRouter = userRouter;
