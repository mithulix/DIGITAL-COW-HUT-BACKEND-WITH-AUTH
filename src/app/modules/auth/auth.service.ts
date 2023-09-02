import { Secret } from 'jsonwebtoken';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config/envConfig';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { User } from '../users/user.model';
import { ApiError } from '../../../shared/errors/ApiError';
import httpStatus from 'http-status';

//-------  login a user auth ------------------------------------------
const logInUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );
  const logInUserRole = isUserExist?.role;
  return {
    logInUserRole,
    accessToken,
    refreshToken,
  };
};

//-------  login an admin ------------------------------------------
const logInAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
  if (
    isAdminExist.password &&
    !(await User.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password  is incorrect');
  }
  const { role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );
  const logInUserRole = isAdminExist?.role;
  return {
    logInUserRole,
    accessToken,
    refreshToken,
  };
};

//-------  refresh token  ------------------------------------------------
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { phoneNumber } = verifiedToken;
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist.phoneNumber,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

//-------  refresh token for admin ------------------------------------------
const refreshTokenForAdmin = async (
  token: string,
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { phoneNumber } = verifiedToken;
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isAdminExist.phoneNumber,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  logInUser,
  refreshToken,
  logInAdmin,
  refreshTokenForAdmin,
};
