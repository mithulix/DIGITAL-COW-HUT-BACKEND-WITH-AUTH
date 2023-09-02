import express from 'express';
import { CowController } from './cow.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CowValidation } from './cow.validation';
import auth from '../auth/auth';
import { ENUM_USER_ROLE } from '../../../enum/userEnum';

const router = express.Router();

router.post(
  '/create-cow',
  auth(ENUM_USER_ROLE.SELLER),
  validateZodRequest(CowValidation.updateCowZodSchema),
  CowController.createCow,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow,
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateZodRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows,
);

export const CowRoutes = router;
