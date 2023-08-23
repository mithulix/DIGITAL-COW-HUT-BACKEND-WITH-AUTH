import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../shared/errors/ApiError';
import { PaginationHelpers } from '../../../helpers/pagination.helpers';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import { Cow } from '../cows/cow.model';
import { User } from '../users/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { USER_ENUM } from '../../../enum/common';
import { IGenericResponse } from '../../../shared/interfaces/common.interface';
import { isOrderFound } from './order.utils';

//--------create a new order------------------------------------
const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const cowId = payload.cow;
  const buyerId = payload.buyer;

  const cow = await Cow.findById(cowId).populate('seller');

  const buyer = await User.findOne({
    _id: buyerId,
    role: USER_ENUM.BUYER,
  });

  if (!cow) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not Found!');
  if (!buyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer account is incorrect!');
  }

  const cowPrice = cow.price;
  let buyerBudget = buyer.budget || 0;

  if (cowPrice > buyerBudget)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Buyer don't have enough budget to buy this cow!",
    );

  let orderData;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Create the Order
    const data = await Order.create([payload], { session });
    orderData = data[0];

    // 2. Decrease Buyer Budget
    buyerBudget = buyerBudget - cowPrice;
    console.log(buyerBudget);
    await User.findOneAndUpdate(
      { _id: buyer, role: USER_ENUM.BUYER },
      { budget: buyerBudget },
    );

    // 3. Increase Seller Income
    const sellerId = cow?.seller?._id;
    await User.findByIdAndUpdate(
      { _id: sellerId, role: USER_ENUM.SELLER },
      { $inc: { income: cowPrice } },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to make Order!');
  }

  if (orderData) {
    orderData = await Order.findById(orderData._id).populate('cow buyer');
  }

  return orderData;
};

//--------get all  orders------------------------------------
const getAllOrders = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IOrder[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const data = await Order.find()
    .populate('cow buyer')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

//--------get a single order------------------------------------
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  if (!(await isOrderFound(id))) {
    throw new ApiError(400, 'Order not Found!');
  }

  const data = await Order.findById(id).populate('cow buyer');
  return data;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
