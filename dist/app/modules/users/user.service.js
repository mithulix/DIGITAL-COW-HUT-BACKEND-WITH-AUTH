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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const common_1 = require("../../../enum/common");
const pagination_helpers_1 = require("../../../helpers/pagination.helpers");
const ApiError_1 = __importDefault(require("../../../shared/errors/ApiError"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
//------signUp / create a new User service --------------------------------
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role == common_1.USER_ENUM.BUYER) {
        if (!payload.budget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Budget not specified !');
        }
        if (payload.budget < 15000) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Budget must be at least more than 15000');
        }
    }
    if (payload.role == common_1.USER_ENUM.SELLER)
        payload.income = 0;
    const data = yield user_model_1.User.create(payload);
    return data;
});
//------Get all user service --------------------------------
const getAllUsers = (paginationOptions, searchFilterFields) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_helpers_1.PaginationHelpers)(paginationOptions);
    // Sort Condition
    const sortCondition = { [sortBy]: sortOrder };
    const { searchTerm } = searchFilterFields, filterData = __rest(searchFilterFields, ["searchTerm"]);
    const andCondition = [];
    // Search Condition
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userSearchFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
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
    const whereCondition = andCondition.length ? { $and: andCondition } : {};
    const data = yield user_model_1.User.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments();
    const meta = { page, limit, total };
    return { meta, data };
});
//------get a single user service --------------------------------
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.isUserAvailable)(id))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not Found!');
    }
    const singleUser = yield user_model_1.User.findById(id);
    return singleUser;
});
//------ update a User service --------------------------------
const updateUser = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.isUserAvailable)(_id))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found in the Database !');
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const keyName = `name${key}`;
            updatedUserData[keyName] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id }, updatedUserData, {
        new: true,
    });
    return result;
});
//------delete a single user service --------------------------------
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, user_utils_1.isUserAvailable)(id))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found in the Database !');
    }
    const deletedUser = yield user_model_1.User.findByIdAndDelete(id);
    return deletedUser;
});
exports.UserService = {
    signUp,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};
