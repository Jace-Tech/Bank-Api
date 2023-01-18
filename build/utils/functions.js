"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDate = exports.generateRandNumber = exports.generateAccountNumber = void 0;
const generateAccountNumber = () => Math.floor(Math.random() * 1000000000);
exports.generateAccountNumber = generateAccountNumber;
const generateRandNumber = (len = 3) => Math.floor(Math.random() * (10 * len));
exports.generateRandNumber = generateRandNumber;
const generateDate = (len = 3) => {
    const today = new Date();
    return Date.parse(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear() + len}`);
};
exports.generateDate = generateDate;
