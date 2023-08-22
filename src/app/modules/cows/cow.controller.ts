import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/logger&sendResponse/sendResponse';
import { paginationFields} from '../../../shared/pagination/pagination.fields';
import { pick } from '../../../shared/pagination/pick';
import { catchAsync } from '../../middlewares/catchAsync';
import { cowFilterOptions } from './cow.constant';
import { CowService } from './cow.service';

//-------create a cow controller---------------------------------
const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await CowService.createCow(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow created successfully',
      data: result,
    });
  },
);

//-------update a cow controller---------------------------------
const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;

    const result = await CowService.updateCow(user, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Cow updated successfully' : 'Cow not found',
      data: result,
    });
  },
);

//-------get all cows controller---------------------------------
const getAllCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterOptions);

    const paginationOption = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(filters, paginationOption);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Cows retrieved successfully' : 'Cow not found',
      meta: result?.meta,
      data: result.data,
    });
  },
);

//-------get a single cow controller---------------------------------
const getSingleCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CowService.getSingleCow(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result ? 'Cow retrieved successfully' : 'Cow not found',
      data: result,
    });
  },
);

//-------delete a cow controller---------------------------------
const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCow = await CowService.deleteCow(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: deletedCow ? 'Cow deleted successfully' : 'Cow not found',
      data: deletedCow,
    });
  },
);

export const CowController = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
