import { Router } from "express"
import { handleSignIn, handleSignUp, handleAdminSignUp } from "../controllers/auth.controller"

const router = Router()

// Register Route
router.post("/sign-up", handleSignUp)
router.post("/sign-in", handleSignIn)
router.post("/admin/sign-up", handleAdminSignUp)



export default router