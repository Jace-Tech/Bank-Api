"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (data, expiresIn = "7d") => {
    if (typeof data === "object") {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, data), process.env.JWT_SECRET, { expiresIn });
    }
    return (0, jsonwebtoken_1.sign)({ data }, process.env.JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
exports.verifyToken = verifyToken;
