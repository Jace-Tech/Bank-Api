"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CardSchema = new mongoose_1.default.Schema({
    account: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "account"
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    cardType: {
        type: String,
        enum: ['credit', 'debit'],
        default: 'debit',
    },
    cvv: {
        type: Number,
        required: [true, "cvv is required"],
    },
    routingNumber: {
        type: Number,
    },
    expiryDate: {
        type: mongoose_1.default.SchemaTypes.Date,
        required: [true, "expiry date is required"],
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("card", CardSchema);
