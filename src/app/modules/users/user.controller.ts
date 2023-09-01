/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import catchAsync from '../../middlewares/catchAsync';
import { IUser } from './user.interface';
import { UserService } from './user.services';

//----------send user response-----------------------------------
const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    data,
  });
};
//----------signup a new user seller--------------------------------
const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { seller, ...userData } = req.body;
    const result = await UserService.createSeller(seller, userData);
    sendUserResponse(res, 'Seller created successfully!', result);
  }
);

//----------signup a new user buyer--------------------------------
const createBuyer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { buyer, ...userData } = req.body;
    const result = await UserService.createBuyer(buyer, userData);
    sendUserResponse(res, 'Buyer created successfully!', result);
  }
);

//---------get all users----------------------------------
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendUserResponse(res, ' All  Users are fetched successfully', result);
});


//---------get a single user----------------------------------
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendUserResponse(res, 'Single User is found', result);
});

//---------update a user----------------------------------
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUser(id, req.body);
  await sendUserResponse(res, `User is Updated successfully`, result);
});

//---------delete a user----------------------------------
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  await sendUserResponse(res, `User is Deleted successfully`, result);
});

export const UserController = {
  createSeller,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
