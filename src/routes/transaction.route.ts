import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { handleGetAllTransactions } from "../controllers/transaction.controller"
import config from "./../configs"

const router = Router()
const { roles } = config

// Register Route
router.get("/", authMiddleware(roles.ADMIN), handleGetAllTransactions)



export default router