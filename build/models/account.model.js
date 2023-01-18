"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0.00
    },
    routingNumber: {
        type: Number,
    },
    accountName: {
        type: String,
    },
    accountType: {
        type: String,
        default: "savings",
        enum: ['savings', 'current']
    },
    pin: {
        type: String,
        default: null
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("account", AccountSchema);
