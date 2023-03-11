import { handleCreateCard, handleCreditAccount, handleTranfer, handleGetAllAccounts, handleTranferAdmin } from './../controllers/account.controller';
import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import config from "../configs"

const router = Router()
const { roles } = config

// Create Card Route
router.post("/:account/card", authMiddleware(roles.USERS), handleCreateCard as any)

// Transfer Route
router.post("/:account/transfer", authMiddleware(roles.USERS), handleTranfer as any)

// Transaction Route
router.post("/:account/transact", authMiddleware(roles.ADMIN), handleTranferAdmin)

// Credit account
router.post("/:account/credit", authMiddleware(roles.ADMIN), handleCreditAccount)

// Get all users account
router.get("/", authMiddleware(roles.ADMIN), handleGetAllAccounts)

export default router