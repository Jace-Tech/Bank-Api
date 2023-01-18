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
exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const customError_1 = require("../utils/customError");
const token_1 = require("../utils/token");
const authMiddleware = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        throw new customError_1.UnAuthorizedError("No authorization header was provided");
    const token = authorization.split(' ')[1];
    if (!token)
        throw new customError_1.UnAuthorizedError("No token found");
    const data = (0, token_1.verifyToken)(token);
    if (!data)
        throw new customError_1.UnAuthorizedError("Invalid token");
    const user = yield user_model_1.default.findOne({ _id: data === null || data === void 0 ? void 0 : data.userId });
    if (!user)
        throw new customError_1.UnAuthorizedError("Unauthorized: Unknown user");
    if (!(user === null || user === void 0 ? void 0 : user.isActive))
        throw new customError_1.UnAuthorizedError("Unauthorized: User is not active");
    if (!roles.includes(data.role))
        throw new customError_1.UnAuthorizedError("Unauthorized: You do not have permission to access this route");
    // Add user to request object
    req.user = user;
    next();
});
exports.authMiddleware = authMiddleware;
