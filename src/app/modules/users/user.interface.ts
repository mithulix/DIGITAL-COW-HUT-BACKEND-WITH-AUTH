import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: string;
  address: string;
  budget: number;
  income: number;
};

export const userRoles = ['seller', 'buyer'];

export type UserModel = Model<IUser, Record<string, unknown>>;
