import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import { pick } from '../../../shared/pagination/pick';
import { catchAsync } from '../../middlewares/catchAsync';
import { cowSearchFilterOptions } from './cow.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

//-------create a cow controller---------------------------------
const createCow: RequestHandler = catchAsync(async (req, res) => {
  const cowData = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data created Successfully!',
    data: result,
  });
});

//-------update a cow controller---------------------------------
const updateCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const cowData = req.body;
  const result = await CowService.updateCow(id, cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data Updated Successfully!',
    data: result,
  });
});

//-------get all cows controller---------------------------------
const getAllCows: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchFilterFields = pick(req.query, cowSearchFilterOptions);
  const result = await CowService.getAllCows(
    paginationOptions,
    searchFilterFields,
  );

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows data Retrieved Successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//-------get a single cow controller---------------------------------
const getSingleCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data Retrieved Successfully!',
    data: result,
  });
});

//-------delete a cow controller---------------------------------
const deleteCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data Deleted Successfully!',
    data: result,
  });
});

export const CowController = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
