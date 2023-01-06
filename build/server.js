"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pre_middleware_1 = __importDefault(require("./middlewares/pre.middleware"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const swaggerui_1 = __importDefault(require("./configs/swaggerui"));
const database_1 = __importDefault(require("./configs/database"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || `http://localhost:${PORT}`;
// Pre middlewares
(0, pre_middleware_1.default)(app);
// Routes
app.get("/", (req, res) => {
    res.json({ message: "Hello from Bank API" });
});
app.get("/ping", (req, res) => {
    res.json({ message: "Hello from Bank API" });
});
app.use("/api", routes_1.default);
// Swagger UI
(0, swaggerui_1.default)(app);
// Error middlewares
(0, error_middleware_1.default)(app);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.default)();
    console.log(`server running at ${ORIGIN}`);
}));
