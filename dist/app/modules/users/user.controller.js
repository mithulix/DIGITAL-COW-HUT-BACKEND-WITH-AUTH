"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../middlewares/catchAsync");
const user_service_1 = require("./user.service");
const user_constant_1 = require("./user.constant");
const pagination_fields_1 = require("../../../shared/pagination/pagination.fields");
const pick_1 = require("../../../shared/pagination/pick");
const sendResponse_1 = require("../../../shared/logger&sendResponse/sendResponse");
//------create a new User controller --------------------------------
const signUp = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.UserService.signUp(user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User signed up successfully',
        data: result,
    });
}));
//------update a User controller --------------------------------
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.body;
    const result = yield user_service_1.UserService.updateUser(id, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result ? ' updated user successfully' : 'user not found',
        data: result,
    });
}));
//------ Get all User --------------------------------
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_fields_1.paginationFields);
    const searchFilterFields = (0, pick_1.pick)(req.query, user_constant_1.userSearchFilterOptions);
    const result = yield user_service_1.UserService.getAllUsers(paginationOptions, searchFilterFields);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: result ? 'Users successfully retrieved' : 'users not found',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
//------ Get Single User --------------------------------
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: result ? 'User get successfully' : ' Please try again later',
        data: result,
    });
}));
//------ Delete a User --------------------------------
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: result ? 'Users deleted successfully' : 'could not be deleted',
        data: result,
    });
}));
exports.UserController = {
    signUp,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};
