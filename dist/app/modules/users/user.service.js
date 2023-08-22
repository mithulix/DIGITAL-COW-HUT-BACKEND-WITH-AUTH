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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
//------create a new User service --------------------------------
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    user.budget = (_a = user.budget) !== null && _a !== void 0 ? _a : 0;
    user.income = (_b = user.income) !== null && _b !== void 0 ? _b : 0;
    const savedUser = yield user_model_1.User.create(user);
    return savedUser;
});
//------Get all user service --------------------------------
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find();
    return allUsers;
});
//------get a single user service --------------------------------
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield user_model_1.User.findById(id);
    return singleUser;
});
//------ update a User service --------------------------------
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found in the database');
    }
    const { name } = user, userData = __rest(user, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const keyName = `name${key}`;
            updatedUserData[keyName] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
//------delete a single user service --------------------------------
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.User.findByIdAndDelete(id);
    return deletedUser;
});
exports.UserService = {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};
