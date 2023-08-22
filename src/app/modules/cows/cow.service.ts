import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../shared/errors/ApiError';
import { PaginationHelpers } from '../../../shared/pagination/pagination.helpers';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import { User } from '../users/user.model';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

//-----create a new Cow--------------------------------
const createCow = async (cow: ICow): Promise<ICow | null> => {
  const isSellerExist = await User.findById(cow.seller);

  if (!isSellerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'seller not found');
  }

  const result = (await Cow.create(cow)).populate('seller');
  return result;
};

//-------update a cow------------------------------
const updateCow = async (
  cow: Partial<ICow>,
  id: string,
): Promise<ICow | null> => {
  if (cow.seller) {
    const isSellerExist = await Cow.findById(id);
    if (!isSellerExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'seller not found');
    }
  }

  cow.label = 'for sale';

  const result = await Cow.findOneAndUpdate({ _id: id }, cow, {
    new: true,
  }).populate('seller');

  return result;
};

//-----get all Cows --------------------------------
const getAllCows = async (
  filters: ICowFilters,
  paginationParams: IPaginationOptions,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.paginationAndSortFields(paginationParams);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  let filterConditions = {};
  const searchableFields: string[] = cowSearchableFields;

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field: string) => {
        return {
          [field]: {
            $regex: new RegExp(searchTerm, 'i'),
          },
        };
      }),
    });

    filterConditions = { $and: andConditions };
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => {
        if (field === 'maxPrice' && value) {
          return { price: { $lte: parseFloat(value) } };
        } else if (field === 'minPrice' && value) {
          return { price: { $gte: parseFloat(value) } };
        } else {
          return { [field]: value };
        }
      }),
    });

    filterConditions = { $and: andConditions };
  }

  const cows = await Cow.find(filterConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: cows,
  };
};

//-----get a single Cow --------------------------------
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

//-----delete a Cow --------------------------------
const deleteCow = async (id: string): Promise<ICow | null> => {
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
