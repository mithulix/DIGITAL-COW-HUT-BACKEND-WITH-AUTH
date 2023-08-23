import express from 'express';
import { validateZodRequest } from '../../middlewares/validateZodRequest';
import { UserController } from './user.controller';
import { UserValidationSchema } from './user.validation';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  validateZodRequest(UserValidationSchema.createUserZodValidateSchema),
  UserController.signUp,
);

userRouter.patch(
  '/:id',
  validateZodRequest(UserValidationSchema.updateZodValidateSchema),
  UserController.updateUser,
);

userRouter.get('/:id', UserController.getSingleUser);

userRouter.delete('/:id', UserController.deleteUser);

userRouter.get('/', UserController.getAllUsers);

export const UserRoutes = userRouter;
