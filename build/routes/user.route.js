"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const configs_1 = __importDefault(require("./../configs"));
const router = (0, express_1.Router)();
const { roles } = configs_1.default;
// Register Route
router.get("/", (0, auth_middleware_1.authMiddleware)(roles.ADMIN), user_controller_1.handleGetAllUsers);
router.get("/:id", user_controller_1.handleGetOneUsers);
router.delete("/:id", user_controller_1.handleDeletetOneUsers);
exports.default = router;
