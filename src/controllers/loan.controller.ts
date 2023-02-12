import { UnAuthorizedError } from './../utils/customError';
import { response } from './../utils/response';
import { sendMail } from './../utils/mailer';
import { BadRequestError, NotFoundError } from '../utils/customError';
import { Response } from 'express';
import { Request } from 'express';
import fs from "fs/promises"
import path from "path"
import userModel from '../models/user.model';
import loanModel from '../models/loan.model';
import notificationModel from '../models/notification.model';


export const handleCreateLoan = async (req: Request, res: Response) => {	 
  if(!req.body.user) throw new BadRequestError("User Id is required")
  if(!req.body.account) throw new BadRequestError("Account ID is required")
  if(!req.body.amount) throw new BadRequestError("Amount is required")
  if(!req.body.income) throw new BadRequestError("Monthly income is required")

  const user = await userModel.findById(req.body.user)
  if(!user) throw new NotFoundError("User not found")

  if(!user.isActive) throw new UnAuthorizedError("User account is disabled")

  await loanModel.create({
    account: req.body.account,
    user: req.body.user,
    amount: req.body.amount, 
  })

  // Send Email
  const text = `
    <p class="message">Hi ${user?.name},</p>
    <p class="message">Your request to loan $${Number(req.body.amount).toLocaleString()} has been sent, We'll notify you on any further development.</p>
  `

  let message = await fs.readFile(path.join(path.dirname(__filename), "../templates/loan_request.html"), "utf-8")
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user?.email!, "Transaction Notification", message)

  // Notify admin
  const admin = await userModel.findOne({ role: "admin" })

  if(admin) 
    await notificationModel.create({
      user: admin._id,
      message: `${user?.name} is requesting for a loan`,
      type: "loan",
      from: req.body.user
    })

  res.status(200).send(response("Loan request sent", null))
}

// TODO: 
// - Admin will approve loan
// - Admin will add interest
// - Admin will add date

export const handleUsersLoan = async (req: Request, res: Response) => {	 
  if(!req.params.userID) throw new BadRequestError("User ID is required")

  const user = await userModel.findById(req.body.user)
  if(!user) throw new NotFoundError("User not found")

  if(!user.isActive) throw new UnAuthorizedError("User account is disabled")

  const usersLoan = await loanModel.find({ user: req.params.userID }).populate("user")
  res.status(200).send(response("Users loans", usersLoan))
}