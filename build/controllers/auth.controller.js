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
exports.handleSignIn = exports.handleSignUp = void 0;
const functions_1 = require("./../utils/functions");
const token_1 = require("./../utils/token");
const user_model_1 = __importDefault(require("./../models/user.model"));
const account_model_1 = __importDefault(require("./../models/account.model"));
const customError_1 = require("../utils/customError");
const response_1 = require("../utils/response");
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new customError_1.BadRequestError("Name is required");
    if (!req.body.email)
        throw new customError_1.BadRequestError("Email is required");
    if (!req.body.password)
        throw new customError_1.BadRequestError("Password is required");
    // Check if user already exists
    let user = yield user_model_1.default.findOne({ email: req.body.email });
    if (user)
        throw new customError_1.BadRequestError("User already exists");
    // Create a new user 
    user = yield user_model_1.default.create(Object.assign({}, req.body));
    // Create an account
    const account = yield account_model_1.default.create({
        user: user._id,
        accountNumber: (0, functions_1.generateAccountNumber)(),
        accountName: user.name,
        routingNumber: (0, functions_1.generateRandNumber)(9)
    });
    // Send response
    const data = {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        role: user.role,
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        balance: account.balance,
        accountId: account._id,
        accountName: account.accountName,
        routingNumber: account.routingNumber,
    };
    res.status(201).send((0, response_1.response)("User created", data, true));
});
exports.handleSignUp = handleSignUp;
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email)
        throw new customError_1.BadRequestError("Email is required");
    if (!req.body.password)
        throw new customError_1.BadRequestError("Password is required");
    // Check if user already exists
    let user = yield user_model_1.default.findOne({ email: req.body.email, password: req.body.password }, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (!user)
        throw new customError_1.NotFoundError("Incorrect Crediential");
    // Generate Token
    const token = (0, token_1.generateToken)({ userId: user._id, role: user.role });
    // Send response
    res.status(200).send((0, response_1.response)("Logged in successfully", { user, token }));
});
exports.handleSignIn = handleSignIn;
