import { handleUsersLoan } from './../controllers/loan.controller';
import { handleCreateLoan } from '../controllers/loan.controller';
import { Router } from 'express';
import { authMiddleware } from './../middlewares/auth.middleware';

import config from "./../configs";

const router = Router();
const { roles } = config;

router.post("/", authMiddleware(roles.USERS), handleCreateLoan)
router.post("/user/:userId", authMiddleware(roles.USERS), handleUsersLoan)

export default router;
