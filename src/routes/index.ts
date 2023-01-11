import { Router } from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"
import accountRoute from "./account.route"


const router = Router()
router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/account", accountRoute)


export default router

