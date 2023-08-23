import { RequestHandler, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../middlewares/catchAsync';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { userSearchFilterOptions } from './user.constant';
import { paginationFields } from '../../../shared/pagination/pagination.fields';
import { pick } from '../../../shared/pagination/pick';
import { sendResponse } from '../../../shared/logger&sendResponse/sendResponse';

//------create a new User controller --------------------------------
const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;
    const result = await UserService.signUp(user);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User signed up successfully',
      data: result,
    });
  },
);

//------update a User controller --------------------------------
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.body;
    const result = await UserService.updateUser(id, user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result ? ' updated user successfully' : 'user not found',
      data: result,
    });
  },
);

//------ Get all User --------------------------------
const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const searchFilterFields = pick(req.query, userSearchFilterOptions);
    const result = await UserService.getAllUsers(
      paginationOptions,
      searchFilterFields,
    );

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Users successfully retrieved' : 'users not found',
      meta: result?.meta,
      data: result?.data,
    });
  },
);

//------ Get Single User --------------------------------
const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.getSingleUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'User get successfully' : ' Please try again later',
      data: result,
    });
  },
);

//------ Delete a User --------------------------------
const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.deleteUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Users deleted successfully' : 'could not be deleted',
      data: result,
    });
  },
);

export const UserController = {
  signUp,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
