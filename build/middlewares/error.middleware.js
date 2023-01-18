"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
exports.default = (app) => {
    // Invalid Routes
    app.use("*", (req, res) => {
        res.status(200).send((0, response_1.response)("Invalid Route", null, false));
    });
    const errorNames = [
        "CastError",
        "JsonWebTokenError",
        "ValidationError",
        "SyntaxError",
        "MongooseError",
        "MongoError",
    ];
    const errorTypes = ["BadRequestError", "NotFoundError", "ServerError", "UnAuthorizedError", "CustomError"];
    // Error Routes
    app.use((error, req, res, next) => {
        console.log(error);
        if (errorTypes.includes(error.name)) {
            res.status(error.statusCode).send((0, response_1.response)(error.message, null, false));
        }
        else if (error.name == "MongoError" && error.code == 11000) {
            // Catch duplicate key field error
            const field = Object.entries(error.keyValue)[0][0];
            res.status(400).send((0, response_1.response)(`${field} already exists`, null, false));
        }
        else if (errorNames.includes(error.name)) {
            res.status(400).send((0, response_1.response)(error.message, null, false));
        }
        else {
            res.status(500).send((0, response_1.response)(error.message, null, false));
        }
    });
    return app;
};
