/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';

const sendAdminResponse = async (res: Response, message: string, data: any) => {
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    data,
  });
};

//---------Create a Admin-------------------------------------
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...admin } = req.body;
    const result = await AdminService.createAdmin(admin);
    sendAdminResponse(res, 'Admin created successfully!', result);
  },
);

//---------Get all Admins-----------------------------------------
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();
  sendAdminResponse(res, ' All Admin Admins fetched successfully', result);
});

//---------Get a Single Admin-------------------------------------
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);
  sendAdminResponse(res, 'Single Admin is found', result);
});

//---------Update a Admin-------------------------------------
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.updateAdmin(id, req.body);
  await sendAdminResponse(res, `Admin is Updated successfully`, result);
});

//---------Delete a Single Admin-------------------------------------
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id);
  await sendAdminResponse(res, `Admin is Deleted successfully`, result);
});

export const AdminController = {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
};
