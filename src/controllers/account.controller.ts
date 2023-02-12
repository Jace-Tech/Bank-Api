import { sendMail } from './../utils/mailer';
import { response } from './../utils/response';
import { generateRandNumber, generateDate } from './../utils/functions';
import { BadRequestError, NotFoundError, UnAuthorizedError } from './../utils/customError';
import { Request, Response } from 'express';
import cardModel from '../models/card.model';
import allowedModel from '../models/allowed.model';
import accountModel from '../models/account.model';
import transactionModel from '../models/transaction.model';
import notificationModel from '../models/notification.model';
import userModel from '../models/user.model';
import fs from "fs/promises"
import path from "path"


export const handleCreateCard = async (req: Request | any, res: Response) => {
  if(!req.params.account) throw new BadRequestError("Account id is required");
  if(!req.user) throw new BadRequestError("Not authenticated")

  const card = await cardModel.create({ 
    account: req.params.account, 
    user: req.user._id,
    cvv: generateRandNumber(),
    expiryDate: generateDate(),
    ...req.body
  })

  res.status(200).send(response("Card created!", card, true))
}

export const handleTranfer = async (req: Request | any, res: Response) => {
  if(!req.params.account) throw new BadRequestError("Account id is required");
  if(!req.user) throw new UnAuthorizedError("Not authenticated")

  // Check if the user is active
  if(!req.user?.isActive) throw new UnAuthorizedError("Account is deactivated")

  // Check if transaction is allowed
  const allowed = await allowedModel.findOne({ 
    user: req?.user._id,
    bank: req.body.bank, 
    accountNumber: req.body.receiver 
  })
  const randomId = `trx_`+ generateRandNumber(11);

  if(!allowed) throw new UnAuthorizedError(`Error Transaction could not be completed \nTransaction id: ${randomId}`)

  // Check balance
  const account = await accountModel.findOne({ accountNumber: req.params.account })
  if(!account) throw new BadRequestError("Account not found")
  if(account?.balance < req.body.amount) throw new BadRequestError("Insufficient Funds")

  // Update Account
  const newBalance = account.balance - req.body.amount
  account.balance = newBalance
  await account.save()

  // Create Transaction
  const transaction = await transactionModel.create({...req.body })

  // Send Email
  const text = `
    <p class="message">Hi ${req?.user?.name},</p>
    <p class="message">Request to ${transaction.type} $${transaction.amount.toLocaleString()} has been sent, It'll be processed as soon as possible. You be updated on any development.</p>
  `

  let message = await fs.readFile(path.join(path.dirname(__filename), "../templates/transaction.html"), "utf-8")
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(req?.user?.email!, "Transaction Notification", message)


  // Check if there's admin
  const admin = await userModel.findOne({ role: "admin" })
  // Create Notification
  if(admin) 
    await notificationModel.create({
      user: admin._id,
      message: `I wish to ${req.body.type} ${req.body.amount} to this account ${req.body.receiver}`,
      type: "transaction",
      from: req.user._id
    })

  res.status(200).send(response("Transaction Created", { transaction, account }, true))
}

export const handleCreditAccount = async (req: Request | any, res: Response) => {	 
  if(!req.params.account) throw new BadRequestError("Account Number is required")
  if(!req.body.amount) throw new BadRequestError("Amount is required")
  if(!req.body.userId) throw new BadRequestError("User ID is required")

  // Search user
  const user = await userModel.findById(req.body.userId)
  if(!user) throw new NotFoundError("User not found")
  if(!user.isActive) throw new UnAuthorizedError("Account is not active");
  

  // Check if account is valid
  const account = await accountModel.findOne({ accountNumber: req.params.account }).populate("user") as any
  if(!account) throw new NotFoundError("Account not found")


  // Update Balance
  const balance = Number(account.balance) + Number(req.body.amount)
  account.balance = balance
  await account.save()

  // Create transaction
  await transactionModel.create({
    amount: req.body.amount,
    sender: account?._id,
    type: "deposit",
    status: "approved",
    receiver: account?.accountNumber
  })

  // Send Email
  const text = `
    <p class="message">Hi ${account?.user?.name},</p>
    <p class="message">Your account was credited with $${Number(req.body?.amount).toLocaleString()}.</p>
  `

  let message = await fs.readFile(path.join(path.dirname(__filename), "../templates/transaction.html"), "utf-8")
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(account?.user?.email!, "Transaction Notification", message)


  res.status(200).send(response("Account credited", account))
}

export const handleGetAllAccounts = async (req: Request | any, res: Response) => {
  const accounts = await accountModel.find({}).populate("user")
  res.status(200).send(response("Users Accounct", accounts))
}