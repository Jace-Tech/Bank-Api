import { handleGetUsersTransaction, handleCancelTransaction, handleTransactionVerification } from './../controllers/transaction.controller';
import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { handleGetAllTransactions, handleApproveTransaction, handleBackdate, handleDeleteTransaction } from "../controllers/transaction.controller"
import config from "./../configs"

const router = Router()
const { roles } = config

// Register Route
router.get("/", authMiddleware(roles.ADMIN), handleGetAllTransactions)

// Get users transactions
router.get("/user/:userId", authMiddleware(roles.USERS), handleGetUsersTransaction)

// Verify transaction
router.post("/:id/verify", authMiddleware(roles.USERS), handleTransactionVerification as any)

// Approve transaction
router.get("/:transactId/approve", authMiddleware(roles.ADMIN), handleApproveTransaction)

// Approve transaction
router.get("/:transactId/approve", authMiddleware(roles.ADMIN), handleApproveTransaction)

// Cancel transaction
router.get("/:transactId/cancel", authMiddleware(roles.ADMIN), handleCancelTransaction)

// Delete transaction
router.delete("/:id", authMiddleware(roles.ADMIN), handleDeleteTransaction)

// Backdate transaction
router.post("/:transactId/backdate", authMiddleware(roles.ADMIN), handleBackdate)
 


export default router