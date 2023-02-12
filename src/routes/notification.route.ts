import { handleGetAllNotification } from './../controllers/notification.controller';
import { handleUsersLoan } from './../controllers/loan.controller';
import { handleCreateLoan } from '../controllers/loan.controller';
import { Router } from 'express';
import { authMiddleware } from './../middlewares/auth.middleware';

import config from "./../configs";

const router = Router();
const { roles } = config;

router.get("/", authMiddleware(roles.ADMIN), handleGetAllNotification)

export default router;
