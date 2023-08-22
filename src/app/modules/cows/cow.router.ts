import express from 'express';
import { validateZodRequest } from '../../middlewares/validateZodRequest';
import { CowController } from './cow.controller';
import { CowValidationSchema } from './cow.validation';

const cowRouter = express.Router();

cowRouter.post(
  '/',
  validateZodRequest(CowValidationSchema.createCowZodValidateSchema),
  CowController.createCow,
);

cowRouter.get('/', CowController.getAllCows);

cowRouter.patch(
  '/:id',
  validateZodRequest(CowValidationSchema.updateCowZodValidateSchema),
  CowController.updateCow,
);

cowRouter.get('/:id', CowController.getSingleCow);

cowRouter.delete('/:id', CowController.deleteCow);

export const CowRouter = cowRouter;
