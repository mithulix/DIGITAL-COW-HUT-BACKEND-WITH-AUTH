/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type ISeller = {
  _id: any;
  id: string;
  name: UserName;
  phoneNumber: string;
  address: string;
  income: number;
  profileImage?: string;
};

export type SellerModel = Model<ISeller>;

export type ISellerFilters = {
  searchTerm?: string;
  id?: string;
};
