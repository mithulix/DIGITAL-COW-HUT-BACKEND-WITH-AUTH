/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  _id: any;
  id: string;
  role: string;
  password: string;
  seller?: Types.ObjectId | ISeller;
  buyer?: Types.ObjectId | IBuyer;
};
export type UserModel = Model<IUser>;
