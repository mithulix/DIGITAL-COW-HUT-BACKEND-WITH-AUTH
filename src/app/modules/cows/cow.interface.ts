import { Model, Types } from 'mongoose';

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ICowBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: ICowBreed;
  weight: number;
  label: 'for sale' | 'sold out';
  category: 'Dairy' | 'Beef' | 'Dual Purpose';
  seller: Types.ObjectId;
};

export type ICowFilters = {
  searchTerm?: string;
  maxPrice?: string;
  minPrice?: string;
  location?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
