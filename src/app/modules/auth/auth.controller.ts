import { Request, Response } from 'express';
import config from '../../../config/envConfig';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../../shared/logger&sendResponse/sendResponse';

//------- login a user -----------------------------------
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.logInUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully !',
    data: others,
  });
});

//------- login an admin---------------------------------------------
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.logInAdmin(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin LogIn Successfully !',
    data: others,
  });
});

//------- refresh token-------------------------------------------
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logIn and Generate a new Access token successfully',
    data: result,
  });
});

//------- refresh token-----------------------------------------------
const refreshTokenForAdmin = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshTokenForAdmin(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin logIn and Generate a new Access token successfully  !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  loginAdmin,
  refreshTokenForAdmin,
};
