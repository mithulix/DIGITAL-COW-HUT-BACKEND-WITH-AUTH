import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

export const SignUpSellerRoutes = router.post(
  '/signup-seller',
  UserController.createSeller,
);

export const SignUpBuyerRoutes = router.post(
  '/signup-buyer',
  UserController.createBuyer,
);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateZodRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
