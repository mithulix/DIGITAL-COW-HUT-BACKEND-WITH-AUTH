import httpStatus from 'http-status';
import { PaginationHelpers } from '../../../helpers/pagination.helpers';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import {  cowSearchFields } from './cow.constant';
import {ICow, ICowSearchFilter } from './cow.interface';
import { Cow } from './cow.model';
import ApiError from '../../../shared/errors/ApiError';
import { IGenericResponse } from '../../../shared/interfaces/common.interface';
import { isCowAvailable, isSellerAvailable } from './cow.utils';

//-----create a new Cow--------------------------------
const createCow = async (payload: ICow): Promise<ICow | null> => {
  if (!(await isSellerAvailable(payload.seller))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Seller account is incorrect!");
  }
  const data = (await Cow.create(payload)).populate("seller");
  return data;
};

//-------update a cow------------------------------
const updateCow = async (_id: string, payload: ICow): Promise<ICow | null> => {
  if (!(await isCowAvailable(_id))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not Found!");
  }

  if (payload.seller && !(await isSellerAvailable(payload.seller))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Seller account is incorrect!");
  }

  const data = await Cow.findOneAndUpdate({ _id }, payload, {
    new: true,
  }).populate("seller");

  return data;
};

//-----get all Cows --------------------------------
const getAllCows = async (
  paginationOptions: IPaginationOptions,
  searchFilterFields: ICowSearchFilter
): Promise<IGenericResponse<ICow[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, minPrice, maxPrice, ...filterData } = searchFilterFields;
  const andCondition = [];

  // Search Condition
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  // Filter Fields
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

  if (minPrice) {
    andCondition.push({ price: { $gte: minPrice } });
  }

  if (maxPrice) {
    andCondition.push({ price: { $lte: maxPrice } });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const data = await Cow.find(whereCondition)
    .populate("seller")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

//-----get a single Cow --------------------------------
const getSingleCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowAvailable(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not Found!");
  }

  const data = await Cow.findById(id).populate("seller");
  return data;
};

//-----delete a Cow --------------------------------
const deleteCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowAvailable(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not Found!");
  }

  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
