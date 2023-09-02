import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { ENUM_USER_ROLE } from '../../../enum/userEnum';
import auth from '../auth/auth';

const router = express.Router();
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  UserController.myProfile,
);

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  UserController.updateUserProfile,
);

export const SignUpSellerRoutes = router.post(
  '/signup-seller',
  UserController.createSeller,
);

export const SignUpBuyerRoutes = router.post(
  '/signup-buyer',
  UserController.createBuyer,
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateZodRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
