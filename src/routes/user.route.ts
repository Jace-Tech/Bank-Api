import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { handleDeletetOneUsers, handleGetAllUsers, handleGetOneUsers } from "../controllers/user.controller"
import config from "./../configs"

const router = Router()
const { roles } = config

// Register Route
router.get("/", authMiddleware(roles.ADMIN), handleGetAllUsers)
router.get("/:id", handleGetOneUsers)
router.delete("/:id", handleDeletetOneUsers)



export default router