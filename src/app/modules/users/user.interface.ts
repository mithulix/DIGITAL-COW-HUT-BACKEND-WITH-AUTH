/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  _id: any;
  id: string;
  role: string;
  password: string;
  phoneNumber: string;
  seller?: Types.ObjectId | ISeller;
  buyer?: Types.ObjectId | IBuyer;
};
export type UserModel = {
  isUserExist(
    phoneNumber: string,
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
