import { handleCreateLoan, handleUsersLoan, handleApproveLoan, handleAllLoans, handleDeleteLoan } from '../controllers/loan.controller';
import { Router } from 'express';
import { authMiddleware } from './../middlewares/auth.middleware';

import config from "./../configs";

const router = Router();
const { roles } = config;

router.get("/", authMiddleware(roles.ADMIN), handleAllLoans)
router.post("/", authMiddleware(roles.USERS), handleCreateLoan)
router.post("/:id/approve", authMiddleware(roles.USERS), handleApproveLoan)
router.post("/user/:userId", authMiddleware(roles.USERS), handleUsersLoan)
router.delete("/:id", authMiddleware(roles.USERS), handleDeleteLoan)

export default router;
