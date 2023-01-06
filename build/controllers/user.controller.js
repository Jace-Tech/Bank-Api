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
exports.handleGetOneUsers = exports.handleGetAllUsers = void 0;
const response_1 = require("./../utils/response");
const user_model_1 = __importDefault(require("../models/user.model"));
const customError_1 = require("../utils/customError");
const handleGetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({}, { __v: 0 });
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
