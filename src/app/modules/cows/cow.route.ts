import express from 'express';
import { CowController } from './cow.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CowValidation } from './cow.validation';

const router = express.Router();

router.post(
  '/create-cow',
  validateZodRequest(CowValidation.updateCowZodSchema),
  CowController.createCow,
);

router.get('/:id', CowController.getSingleCow);

router.delete('/:id', CowController.deleteCow);

router.patch(
  '/:id',
  validateZodRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow,
);

router.get('/', CowController.getAllCows);

export const CowRoutes = router;
