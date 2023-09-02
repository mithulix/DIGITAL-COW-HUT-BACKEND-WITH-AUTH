/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../../config/envConfig';
import { User } from './user.model';
import { ApiError } from '../../../shared/errors/ApiError';
import { IUser } from './user.interface';
import mongoose from 'mongoose';
import { generateBuyerId, generateSellerId } from './user.utils';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';
import { ENUM_USER_ROLE } from '../../../enum/userEnum';
import { Admin } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
  } catch (ApiError) {
    await session.abortTransaction();
    await session.endSession();
    throw ApiError;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'seller',
    });
  }
  return newUserAllData;
};

//------------create a new buyer ------------------------------------
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
  } catch (ApiError) {
    await session.abortTransaction();
    await session.endSession();
    throw ApiError;
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

//------- create my profile --------------------------------
const myProfile = async (user: JwtPayload | null) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  let result;

  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
    }
    result = await User.find({ buyer: buyer.buyer }).populate('buyer');
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const seller = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'seller not found');
    }
    result = await User.find({ seller: seller.seller }).populate('seller');
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOne({ phoneNumber: user.phoneNumber });
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'admin not found');
    }
  }

  return result;
};

//------- update user profile --------------------------------
const updateUserProfile = async (user: JwtPayload | null, payload: any) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  if (payload.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.default_salt_rounds),
    );
    payload.password = hashedPassword;
  }

  let result;

  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true },
    ).populate('buyer');
    const id = buyer?.buyer;
    await Buyer.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const seller = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'seller not found');
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true },
    ).populate('seller');
    const id = seller?.seller;
    await Seller.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      payload,
      { new: true },
    );
  }

  return result;
};

export const UserService = {
  createSeller,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateUserProfile,
};
