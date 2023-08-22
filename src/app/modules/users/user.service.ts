import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

//------create a new User service --------------------------------
const createUser = async (user: IUser): Promise<IUser | null> => {
  user.budget = user.budget ?? 0;
  user.income = user.income ?? 0;
  const savedUser = await User.create(user);
  return savedUser;
};

//------Get all user service --------------------------------
const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

//------get a single user service --------------------------------
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const singleUser = await User.findById(id);
  return singleUser;
};

//------ update a User service --------------------------------
const updateUser = async (
  user: Partial<IUser>,
  id: string,
): Promise<IUser | null> => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found in the database');
  }

  const { name, ...userData } = user;
  const updatedUserData: Partial<IUser> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

//------delete a single user service --------------------------------
const deleteUser = async (id: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

export const UserService = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
