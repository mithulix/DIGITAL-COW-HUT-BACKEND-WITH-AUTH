import httpStatus from 'http-status';
import config from '../../../config/envConfig';
import {User} from './user.model';
import { ApiError } from '../../../shared/errors/ApiError';
import { IUser } from './user.interface';
import mongoose from 'mongoose';
import { generateBuyerId, generateSellerId } from './user.utils';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';

//------------create a new seller ------------------------------------
const createSeller = async (
  seller: ISeller,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'seller';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateSellerId();
    user.id = id; //s-00001
    seller.id = id; //s-00001

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }

    user.seller = newSeller[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'seller',
    });
  }
  return newUserAllData;
};

//------------create a new seller ------------------------------------
const createBuyer = async (
  buyer: IBuyer,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'buyer';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateBuyerId();
    user.id = id;
    buyer.id = id;

    const newBuyer = await Buyer.create([buyer], { session });

    if (!newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create buyer');
    }

    user.buyer = newBuyer[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'buyer',
    });
  }

  return newUserAllData;
};

//------get all users service---------------------------------------
const getAllUsers = async () => {
  const result = await User.find({}).populate('seller').populate('buyer');
  return result;
};

//------get a single user service---------------------------------------
const getSingleUser = async (id: string) => {
  const result = await User.findById(id).populate('seller').populate('buyer');
  return result;
};

//------update a user service---------------------------------------
const updateUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//-------delete a user service--------------------------------
const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete(id);

  let buyerDelete = null;
  let sellerDelete = null;

  if (user.buyer) {
    buyerDelete = await Buyer.findByIdAndDelete({ _id: user.buyer });
  }
  if (user.seller) {
    sellerDelete = await Seller.findByIdAndDelete({ _id: user.seller });
  }
  return { result, buyerDelete, sellerDelete };
};

export const UserService = {
  createSeller,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
