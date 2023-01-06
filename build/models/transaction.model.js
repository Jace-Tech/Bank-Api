"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    type: {
        type: String,
        required: true,
        enum: ['deposit', 'withdraw', 'transfer']
    },
    amount: {
        type: Number,
        required: true,
    },
    description: String,
    receiver: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("account", TransactionSchema);
