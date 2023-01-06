"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (message, data = null, success = true) => {
    return { message, data, success };
};
exports.response = response;
