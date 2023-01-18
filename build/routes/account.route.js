"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_controller_1 = require("./../controllers/account.controller");
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = require("express");
const configs_1 = __importDefault(require("../configs"));
const router = (0, express_1.Router)();
const { roles } = configs_1.default;
// Register Route
router.post("/:account/card", (0, auth_middleware_1.authMiddleware)(roles.USERS), account_controller_1.handleCreateCard);
exports.default = router;
