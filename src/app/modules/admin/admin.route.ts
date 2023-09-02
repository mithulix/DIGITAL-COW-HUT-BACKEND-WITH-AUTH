import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { AdminController } from './admin.controller';
import { AuthValidation } from '../auth/auth.validation';
import validateZodRequest from '../../middlewares/validateZodRequest';

const router = express.Router();

router.post('/create-admin', AdminController.createAdmin);

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.patch('/:id', AdminController.updateAdmin);
router.get('/', AdminController.getAllAdmins);

router.post(
  '/login',
  validateZodRequest(AuthValidation.loginZodSchema),
  AuthController.loginAdmin,
);

router.post(
  '/refresh-token',
  validateZodRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshTokenForAdmin,
);

export const AdminRoutes = router;
