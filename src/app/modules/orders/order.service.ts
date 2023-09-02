import {Cow} from '../cows/cow.model';
import { IOrder } from './order.interface';
import mongoose from 'mongoose';
import Order from './order.model';

import { Seller } from '../seller/seller.model';
import { Buyer } from '../buyer/buyer.model';

//-------- order a new cow service------------------------------
const orderCow = async (order: IOrder) => {
  const session = await mongoose.startSession();
  let newOrderData = null;
  try {
    session.startTransaction();
    // Find the cow to be sold
    //cow:id
    //buyer:id
    const cow = await Cow.findById(order.cow).session(session);
    if (!cow) {
      throw new Error('Cow not found');
    }
    // Check if the cow is available for sale
    if (cow.label !== 'for sale') {
      throw new Error('The cow is not available for sale');
    }

    // Find the seller
    const seller = await Seller.findById(cow.seller).session(session);
    if (!seller) {
      throw new Error('Seller not found');
    }

    // Find the buyer
    const buyer = await Buyer.findById(order.buyer).session(session);
    if (!buyer) {
      throw new Error('Buyer not found');
    }
    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget < cow.price) {
      throw new Error('Buyer does not have enough budget to buy the cow');
    }

    // Update the cow's status to sold
    cow.label = 'sold out';
    await cow.save();

    // Transfer money from buyer to seller
    seller.income += cow.price;
    buyer.budget -= cow.price;
    await seller.save();
    await buyer.save();

    const newOrder = await Order.create(
      {
        cow: cow._id,
        buyer: buyer._id,
      },
      { session },
    );

    newOrderData = newOrder[0];

    // Populate the 'buyer' field in the newOrder document
    const populatedOrder = await Order.findById(newOrderData._id)
      .populate('buyer')
      .populate('cow');

    await session.commitTransaction();
    await session.endSession();
    return populatedOrder;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

//--------get all orders service------------------------------
const getAllOrders = async () => {
  const result = await Order.find({}).populate('cow').populate('buyer');
  return result;
};

//--------get single order service------------------------------
const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('cow').populate('buyer');
  return result;
};

export const OrderService = {
  orderCow,
  getSingleOrder,
  getAllOrders,
};
