import express from 'express';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
const router = express.Router();

router.post(
  '/create-cow',
  validateZodRequest(CowValidation.createCowZodSchema),
  CowController.createCow,
);

router.get('/', CowController.getAllCows);

router.get('/:id', CowController.getCow);

router.patch(
  '/:id',
  validateZodRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow,
);

router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;
