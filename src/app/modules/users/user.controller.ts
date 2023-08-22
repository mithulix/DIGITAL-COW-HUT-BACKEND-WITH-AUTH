import { RequestHandler, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../middlewares/catchAsync';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import { UserService } from './user.service';

//------create a new User controller --------------------------------
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await UserService.createUser(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created successfully',
      data: result,
    });
  },
);

//------update a User controller --------------------------------
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;
    const result = await UserService.updateUser(user, id);

    sendResponse(res, {
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
    const result = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Users successfully retrieved' : 'users not found',
      data: result,
    });
  },
);

//------ Get Single User --------------------------------
const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.getSingleUser(id);

    sendResponse(res, {
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
    const { id } = req.params;

    const result = await UserService.deleteUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Users deleted successfully' : 'could not be deleted',
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
