import httpStatus from 'http-status';
import { USER_ENUM } from '../../../enum/userEnum';
import paginationHelper from '../../../helpers/pagination.helpers';
import { ApiError } from '../../../shared/errors/ApiError';
import { IAllDataType } from '../../../shared/interfaces/common.interface';
import { IPagination } from '../../../shared/pagination/pagination.interface';

import { userSearchFields } from './user.constant';
import { IUser, IUserSearchFilter } from './user.interface';
import User from './user.model';
import isUserFound from './user.utils';

//------signup a new user service---------------------------------------
const signup = async (payload: IUser): Promise<IUser | null> => {
  if (payload.role == USER_ENUM.BUYER) {
    if (!payload.budget)
      throw new ApiError(httpStatus.NOT_FOUND, 'Budget is Required!');
    if (payload.budget < 15000) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Budget should be at least more than 15000!',
      );
    }
  }

  if (payload.role == USER_ENUM.SELLER) payload.income = 0;

  const data = await User.create(payload);
  return data;
};

//------get all users service---------------------------------------
const getAllUsers = async (
  paginationOptions: IPagination,
  searchFilterFields: IUserSearchFilter,
): Promise<IAllDataType<IUser[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, ...filterdata } = searchFilterFields;
  const andCondition = [];

  // Search Condition
  if (searchTerm) {
    andCondition.push({
      $or: userSearchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Filter Fields
  if (Object.keys(filterdata).length) {
    andCondition.push({
      $and: Object.entries(filterdata).map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const data = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

//------get a single user service---------------------------------------
const getUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserFound(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found!');
  }

  const data = await User.findById(id);
  return data;
};

//------update a user service---------------------------------------
const updateUser = async (
  _id: string,
  payload: IUser,
): Promise<IUser | null> => {
  if (!(await isUserFound(_id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found!');
  }

  const { name, ...userData } = payload;

  if (name && Object.keys(name).length) {
    Object.keys(name).map(field => {
      const nameKey = `name.${field}`;
      (userData as any)[nameKey] = name[field as keyof typeof name];
    });
  }

  const data = await User.findOneAndUpdate({ _id }, userData, {
    new: true,
    runValidators: true,
  });

  return data;
};

//-------delete a user service--------------------------------
const deleteUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserFound(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found!');
  }

  const data = await User.findByIdAndDelete(id);
  return data;
};

export const UserService = {
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
