import { deleteAllowed, handleCreateAllowed, updateAllowed, handleGetUsersAllowed } from './../controllers/allowed.controller';
import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import config from "./../configs/index"

const { roles } = config

const router = Router()

// Register Route
router.post("/user/:userId/create", authMiddleware(roles.ADMIN), handleCreateAllowed)
router.delete("/:allowId/delete", authMiddleware(roles.ADMIN), deleteAllowed)
router.post("/:allowId/update", authMiddleware(roles.ADMIN), updateAllowed)
router.get("/user/:id", authMiddleware(roles.ADMIN), handleGetUsersAllowed)



export default router