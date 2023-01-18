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
exports.handleCreateCard = void 0;
const response_1 = require("./../utils/response");
const functions_1 = require("./../utils/functions");
const customError_1 = require("./../utils/customError");
const card_model_1 = __importDefault(require("../models/card.model"));
const handleCreateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.account)
        throw new customError_1.BadRequestError("Account id is required");
    if (!req.user)
        throw new customError_1.BadRequestError("Not authenticated");
    const card = yield card_model_1.default.create(Object.assign({ account: req.params.account, user: req.user._id, cvv: (0, functions_1.generateRandNumber)(), expiryDate: (0, functions_1.generateDate)() }, req.body));
    res.status(200).send((0, response_1.response)("Card created!", card, true));
});
exports.handleCreateCard = handleCreateCard;
