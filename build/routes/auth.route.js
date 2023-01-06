"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Register Route
router.post("/sign-up", auth_controller_1.handleSignUp);
router.post("/sign-in", auth_controller_1.handleSignIn);
exports.default = router;
