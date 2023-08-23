import httpStatus from 'http-status';
import { USER_ENUM } from '../../../enum/common';
import { PaginationHelpers } from '../../../helpers/pagination.helpers';
import ApiError from '../../../shared/errors/ApiError';
import { IGenericResponse } from '../../../shared/interfaces/common.interface';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import { userSearchFields } from './user.constant';
import { IUser, IUserSearchFilter } from './user.interface';
import { User } from './user.model';
import { isUserAvailable } from './user.utils';

//------signUp / create a new User service --------------------------------
const signUp = async (payload: IUser): Promise<IUser | null> => {
  if (payload.role == USER_ENUM.BUYER) {
    if (!payload.budget) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Budget not specified !');
    }
    if (payload.budget < 15000) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Budget must be at least more than 15000',
      );
    }
  }

  if (payload.role == USER_ENUM.SELLER) payload.income = 0;

  const data = await User.create(payload);
  return data;
};

//------Get all user service --------------------------------
const getAllUsers = async (
  paginationOptions: IPaginationOptions,
  searchFilterFields: IUserSearchFilter,
): Promise<IGenericResponse<IUser[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, ...filterData } = searchFilterFields;
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
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
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

//------get a single user service --------------------------------
const getSingleUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserAvailable(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found!');
  }

  const singleUser = await User.findById(id);
  return singleUser;
};

//------ update a User service --------------------------------
const updateUser = async (
  _id: string,
  payload: IUser,
): Promise<IUser | null> => {
  if (!(await isUserAvailable(_id))) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found in the Database !',
    );
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id }, updatedUserData, {
    new: true,
  });
  return result;
};

//------delete a single user service --------------------------------
const deleteUser = async (id: string): Promise<IUser | null> => {
  if (!(await isUserAvailable(id))) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found in the Database !',
    );
  }

  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

export const UserService = {
  signUp,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
