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
exports.handleGetUsersAccounts = exports.handleGetAllUsersAndAccounts = exports.handleGetUserAccount = exports.handleDeletetOneUsers = exports.handleGetOneUsers = exports.handleGetAllUsers = void 0;
const response_1 = require("./../utils/response");
const user_model_1 = __importDefault(require("../models/user.model"));
const customError_1 = require("../utils/customError");
const account_model_1 = __importDefault(require("../models/account.model"));
const handleGetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield user_model_1.default.find({}, { __v: 0 });
    users = users.filter((user) => user.role !== "admin");
    res.status(200).send((0, response_1.response)("All users", users));
});
exports.handleGetAllUsers = handleGetAllUsers;
const handleGetOneUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new customError_1.BadRequestError("id required");
    const user = yield user_model_1.default.findOne({ _id: id }, { __v: 0 });
    res.status(200).send((0, response_1.response)("User", user));
});
exports.handleGetOneUsers = handleGetOneUsers;
const handleDeletetOneUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new customError_1.BadRequestError("id required");
    const user = yield user_model_1.default.findOne({ _id: id }, { __v: 0 });
    if ((user === null || user === void 0 ? void 0 : user._id) != id && req.role === "user")
        throw new customError_1.BadRequestError("Unauthorized!");
    yield (user === null || user === void 0 ? void 0 : user.delete());
    yield account_model_1.default.deleteOne({ user: id });
    res.status(200).send((0, response_1.response)("User deleted", user));
});
exports.handleDeletetOneUsers = handleDeletetOneUsers;
const handleGetUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new customError_1.BadRequestError("id required");
    const account = yield account_model_1.default.findOne({ user: id }, { __v: 0 }).populate(['user']);
    if ((account === null || account === void 0 ? void 0 : account.user) != id && req.role === "user")
        throw new customError_1.BadRequestError("Unauthorized!");
    res.status(200).send((0, response_1.response)("User account", account));
});
exports.handleGetUserAccount = handleGetUserAccount;
const handleGetAllUsersAndAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.find({}, { __v: 0 }).populate(["user"]);
    res.status(200).send((0, response_1.response)("User accounts", accounts));
});
exports.handleGetAllUsersAndAccounts = handleGetAllUsersAndAccounts;
const handleGetUsersAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.find({}, { __v: 0 });
    res.status(200).send((0, response_1.response)("User accounts", accounts));
});
exports.handleGetUsersAccounts = handleGetUsersAccounts;
