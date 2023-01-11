import { handleCreateCard } from './../controllers/account.controller';
import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import config from "../configs"

const router = Router()
const { roles } = config

// Register Route
router.post("/:account/card", authMiddleware(roles.USERS), handleCreateCard)



export default router