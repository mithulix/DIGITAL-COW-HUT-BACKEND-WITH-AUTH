/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import catchAsync from '../../middlewares/catchAsync';
import { BuyerService } from './buyer.service';
import { IBuyer } from './buyer.interface';

const sendBuyerResponse = async (res: Response, message: string, data: any) => {
  sendResponse<IBuyer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    data,
  });
};

//------------get all buyers-------------------------------
const getAllBuyers = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerService.getAllBuyers();
  sendBuyerResponse(res, ' All Buyer Buyers fetched successfully', result);
});

//------------get a single buyer-------------------------------
const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.getSingleBuyer(id);
  sendBuyerResponse(res, 'Single Buyer is found', result);
});

//------------update a buyer-------------------------------
const updateBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.updateBuyer(id, req.body);
  await sendBuyerResponse(res, `Buyer is Updated successfully`, result);
});

//------------delete a buyer-------------------------------
const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.deleteBuyer(id);
  await sendBuyerResponse(res, `Buyer is Deleted successfully`, result);
});

export const BuyerController = {
  deleteBuyer,
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
};
