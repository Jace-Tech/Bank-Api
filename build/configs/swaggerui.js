"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.default = (app) => {
    const options = {
        definition: {
            openapi: "3.1.0",
            swagger: "2.0",
            info: {
                title: "BANK API",
                version: "1.0.0",
                description: "BANK API documentation",
                license: {
                    name: "MIT",
                },
                contact: {
                    name: "Chidindu Emmanuel Aneke [JACE]",
                    url: "https://github.com/Jace-Tech",
                    email: "jacedev151@gmail.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:5000",
                },
            ],
        },
        apis: ["src/models/*.ts", "build/models/*js"],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    return app;
};
