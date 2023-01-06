import { Router } from "express"
import { handleSignIn, handleSignUp } from "../controllers/auth.controller"

const router = Router()

// Register Route
router.post("/sign-up", handleSignUp)
router.post("/sign-in", handleSignIn)



export default router