import express from 'express';
import { zodValidateRequest } from '../../middlewares/zodValidateRequest';
import { UserController } from "./user.controller";
import { UserValidationSchema } from "./user.validation";

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.patch('/:id', zodValidateRequest(UserValidationSchema.updateZodValidateSchema),
    UserController.updateUser
);

userRouter.get('/:id', UserController.getSingleUser);

userRouter.get('/:id', UserController.deleteUser);

userRouter.post('/signup',zodValidateRequest(UserValidationSchema.createUserZodValidateSchema),
    UserController.createUser
);

export const UserRouter = userRouter;