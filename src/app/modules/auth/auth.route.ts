import express from 'express';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

router.post(
  '/login',
  validateZodRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

router.post(
  '/refresh-token',
  validateZodRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
