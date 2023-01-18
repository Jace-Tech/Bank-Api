"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = exports.ServerError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 400;
    }
}
exports.CustomError = CustomError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
    }
}
exports.ServerError = ServerError;
class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 401;
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
