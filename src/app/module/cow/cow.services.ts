import httpStatus from 'http-status';
import paginationHelper from '../../../helpers/pagination.helpers';
import { ApiError } from '../../../shared/errors/ApiError';
import { IAllDataType } from '../../../shared/interfaces/common.interface';
import { IPagination } from '../../../shared/pagination/pagination.interface';
import { cowSearchFields } from './cow.constant';
import { ICow, ICowSearchFilter } from './cow.interface';
import Cow from './cow.model';
import { isCowFound, isSeller } from './cow.utils';

//-------create a new cow service --------------------------
const createCow = async (payload: ICow): Promise<ICow | null> => {
  if (!(await isSeller(payload.seller))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller account is incorrect!');
  }
  const data = (await Cow.create(payload)).populate('seller');
  return data;
};

//-------get all Cows--------------------------
const getAllCows = async (
  paginationOptions: IPagination,
  searchFilterFields: ICowSearchFilter,
): Promise<IAllDataType<ICow[]> | null> => {
  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  // Sort Condition
  const sortCondition = { [sortBy]: sortOrder };

  const { searchTerm, minPrice, maxPrice, ...filterdata } = searchFilterFields;
  const andCondition = [];

  // Search Condition
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Filter Fields
  if (Object.keys(filterdata).length) {
    andCondition.push({
      $and: Object.entries(filterdata).map(([field, value]) => ({
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
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  const meta = { page, limit, total };
  return { meta, data };
};

//-------get a single cow--------------------------
const getCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowFound(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not Found!');
  }

  const data = await Cow.findById(id).populate('seller');
  return data;
};

//-------update a cow--------------------------
const updateCow = async (_id: string, payload: ICow): Promise<ICow | null> => {
  if (!(await isCowFound(_id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not Found!');
  }

  if (payload.seller && !(await isSeller(payload.seller))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller account is incorrect!');
  }

  const data = await Cow.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  }).populate('seller');

  return data;
};

//-------delete a cow--------------------------
const deleteCow = async (id: string): Promise<ICow | null> => {
  if (!(await isCowFound(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not Found!');
  }

  const data = await Cow.findByIdAndDelete(id).populate('seller');
  return data;
};

export const CowService = {
  createCow,
  getAllCows,
  getCow,
  updateCow,
  deleteCow,
};
