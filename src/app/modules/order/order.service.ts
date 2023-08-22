import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../shared/errors/ApiError';
import { PaginationHelpers } from '../../../helpers/pagination.helpers';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import { Cow } from '../cows/cow.model';
import { User } from '../users/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';


//--------create a new order------------------------------------
const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const cow = await Cow.findById(order.cow);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }

  const buyer = await User.findById(order.buyer);
  if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'seller not found');
  }

  if (buyer.budget < cow.price) {
    throw new ApiError(
      httpStatus.PAYMENT_REQUIRED,
      `buyer budget must be greater than ${cow.price}`
    );
  }

  let finalOrder = null;

  const session = await mongoose.startSession();
  try {
    (await session).startTransaction();

    const seller = await User.findById(cow.seller).session(session);

    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
    }

    cow.label = 'sold out';

    buyer.budget = buyer.budget - cow.price;
    seller.income = seller.income + cow.price;

    await seller.save({ session: session });
    await buyer.save({ session: session });

    const result = await Order.create([order], { session: session });

    if (result.length > 0) {
      finalOrder = result[0];
    } else {
      finalOrder = null;
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (finalOrder) {
    finalOrder = await Order.findById(finalOrder._id)
      .populate('buyer')
      .populate('cow');
  }

  return finalOrder;
};

//--------get all  orders------------------------------------
const getAllOrders = async (
    paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.paginationAndSortFields(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const orders = await Order.find()
    .populate('buyer')
    .populate('cow')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
    },
  };
};


//--------get a single order------------------------------------
const getSingleOrder = async (id: string) => {
  const orders = await Order.findById(id).populate('buyer').populate('cow');
  return orders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};