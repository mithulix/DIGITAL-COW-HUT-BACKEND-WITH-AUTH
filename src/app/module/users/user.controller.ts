import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import pick from '../../../shared/pagination/pick';
import catchAsync from '../../middlewares/catchAsync';
import { userSearchFilterOptions } from './user.constant';
import { IUser } from './user.interface';
import { UserService } from './user.services';

//----------signup a new user buyer / seller--------------------------------
const signup: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.signup(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signed up Successfully!',
    data: result,
  });
});

//---------get all users----------------------------------
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchFilterFields = pick(req.query, userSearchFilterOptions);
  const result = await UserService.getAllUsers(
    paginationOptions,
    searchFilterFields,
  );

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users Retrieved Successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//---------get a single user----------------------------------
const getUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.getUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retrieved Successfully!',
    data: result,
  });
});

//---------update a user----------------------------------
const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const result = await UserService.updateUser(id, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully!',
    data: result,
  });
});
//---------delete a user----------------------------------
const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully!',
    data: result,
  });
});

export const UserController = {
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
