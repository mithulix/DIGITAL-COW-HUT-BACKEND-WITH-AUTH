import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

router.post(
  '/signup',
  validateZodRequest(UserValidation.signupZodSchema),
  UserController.signup,
);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUser);

router.patch(
  '/:id',
  validateZodRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
