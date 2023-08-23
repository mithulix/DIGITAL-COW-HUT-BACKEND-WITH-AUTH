import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import sendResponse from "../../../shared/logger&sendResponse/sendResponse";
import { paginationFields } from "../../../shared/pagination/pagination.fields";
import pick from "../../../shared/pagination/pick";
import catchAsync from "../../middlewares/catchAsync";
import { cowSearchFilterOptions } from "./cow.constant";
import { ICow } from "./cow.interface";
import { CowService } from "./cow.services";

//-------create a new cow--------------------------
const createCow: RequestHandler = catchAsync(async (req, res) => {
  const cowData = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data created Successfully!",
    data: result,
  });
});

//-------get all cows--------------------------
const getAllCows: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchFilterFields = pick(req.query, cowSearchFilterOptions);
  const result = await CowService.getAllCows(
    paginationOptions,
    searchFilterFields
  );

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Cows Retrieved Successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

const getCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.getCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Retrieved Successfully",
    data: result,
  });
});

//-------update a cow--------------------------
const updateCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const cowData = req.body;
  const result = await CowService.updateCow(id, cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Updated Successfully!",
    data: result,
  });
});

//-------delete a cow--------------------------
const deleteCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Deleted Successfully!",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getCow,
  updateCow,
  deleteCow,
};
