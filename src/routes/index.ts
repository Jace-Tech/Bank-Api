import { Router } from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"


const router = Router()
router.use("/auth", authRoute)
router.use("/user", userRoute)


export default router
