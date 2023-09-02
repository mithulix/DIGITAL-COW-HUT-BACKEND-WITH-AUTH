import { buildWhereConditions } from '../../../helpers/buildWhereConditions';
import { ICow, ICowFilters } from './cow.interface';
import { IGenericResponse } from '../../../shared/interfaces/common.interface';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { cowSearchableFields } from './cow.constant';
import { Cow } from './cow.model';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
import { ApiError } from '../../../shared/errors/ApiError';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

//-------create a new cow service --------------------------
const createCow = async (payload: ICow) => {
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};

//-------get all Cows------------------------------------
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    cowSearchableFields,
    sortBy,
    sortOrder,
  );

  const result = await Cow.find(whereConditions)
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
    data: result,
  };
};

//-------get a single cow--------------------------
const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id).populate('seller');

  return result;
};
//-------update a cow--------------------------
const updateCow = async (
  id: string,
  user: JwtPayload | null,
  payload: Partial<ICow>,
) => {
  if (!user || !user.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  const loggedInUser = await User.findOne({ phoneNumber: user.phoneNumber });
  const cow = await Cow.findOne({ _id: id });

  if (!loggedInUser || !cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User or Cow not found');
  }

  if (String(loggedInUser.seller) !== String(cow.seller)) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this Cow🐮',
    );
  }

  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

//-------delete a cow--------------------------
const deleteCow = async (id: string, user: JwtPayload | null) => {
  if (!user || !user.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  const loggedInUser = await User.findOne({ phoneNumber: user.phoneNumber });
  const cow = await Cow.findOne({ _id: id });

  if (!loggedInUser || !cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User or Cow not found');
  }
  if (String(loggedInUser.seller) !== String(cow.seller)) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this Cow',
    );
  }

  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
