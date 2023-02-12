import { response } from './../utils/response';
import { CustomError } from './../utils/customError';
import dotenv from 'dotenv';
import { Router, Request, Response } from "express"

import authRoute from "./auth.route"
import userRoute from "./user.route"
import allowedRoute from "./allowed.route"
import accountRoute from "./account.route"
import loanRoute from "./loan.route"
import transactionRoute from "./transaction.route"
import notificationRoute from "./notification.route"


import { v2 as cloudinary } from "cloudinary"
dotenv.config()

cloudinary.config({
  api_key: process.env.CLOUD_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_SECRET,
})

const router = Router()

// UPLOAD PICTURES
router.post("/upload-image", async (req: Request, res: Response) => {
  if(!req.body.image) throw new CustomError("Image not specified")
  const image = await cloudinary.uploader.upload(req.body.image)
  const data = {
    url: image.secure_url,
    type: image.type,
    width: image.width,
    height: image.height,
    size: image.bytes
  }
  res.status(200).send(response("Image url generated", data, true))
})

router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/transaction", transactionRoute)
router.use("/account", accountRoute)
router.use("/allowed", allowedRoute)
router.use("/loan", loanRoute)
router.use("/notification", notificationRoute)


export default router

