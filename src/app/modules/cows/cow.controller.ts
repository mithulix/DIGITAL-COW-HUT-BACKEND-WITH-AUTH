/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import pick from '../../../shared/pagination/pick';
import catchAsync from '../../middlewares/catchAsync';
import { ICow } from './cow.interface';
import { Request, Response } from 'express';
import { CowService } from './cow.service';
import { cowFilterableFields } from './cow.constant';

const sendCowResponse = async (res: Response, message: string, data: any) => {
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    data,
  });
};

//-------create a new cow--------------------------
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...CowData } = req.body;
  const result = await CowService.createCow(CowData);
  sendCowResponse(res, 'Cow is created successfully', result);
});

//-------get all cows--------------------------
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendCowResponse(res, ' All Cows fetched successfully', result);
});

//------------get a single cow---------------------------------
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);
  sendCowResponse(res, 'Single Cow is found', result);
});

//-------update a cow--------------------------
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CowService.updateCow(id, req.body);

  await sendCowResponse(res, `Cow is Updated successfully`, result);
});

//-------delete a cow--------------------------
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CowService.deleteCow(id);

  await sendCowResponse(res, `Cow is Deleted successfully`, result);
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
