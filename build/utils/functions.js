"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = void 0;
const generateAccountNumber = () => Math.floor(Math.random() * 1000000000);
exports.generateAccountNumber = generateAccountNumber;
