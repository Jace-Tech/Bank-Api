import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { handleDeletetOneUsers, handleGetAllUsers, handleGetAllUsersAndAccounts, handleGetOneUsers, handleGetUserAccount } from "../controllers/user.controller"
import config from "./../configs"

const router = Router()
const { roles } = config

// Register Route
router.get("/accounts", authMiddleware(roles.ADMIN), handleGetAllUsersAndAccounts)
router.get("/", authMiddleware(roles.ADMIN), handleGetAllUsers)
router.get("/:id", handleGetOneUsers)
router.delete("/:id", authMiddleware(roles.ADMIN), handleDeletetOneUsers)
router.get("/:id/account", authMiddleware(roles.USERS), handleGetUserAccount)



export default router