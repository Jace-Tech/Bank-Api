import { MESSAGE_STYLES } from './../templates/index';
import { sendMail } from './../utils/mailer';
import { response } from './../utils/response';
import { generateRandNumber, generateDate } from './../utils/functions';
import { BadRequestError, NotFoundError, UnAuthorizedError } from './../utils/customError';
import { Request, Response } from 'express';
import cardModel from '../models/card.model';
import allowedModel from '../models/allowed.model';
import accountModel from '../models/account.model';
import transactionModel from '../models/transaction.model';
import userModel from '../models/user.model';
import { TRANSACTION_TEMPLATE } from '../templates';
import tokenModel from '../models/token.model';
import { RequestAlt } from '../@types';


export const handleCreateCard = async (req: Request & RequestAlt, res: Response) => {
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

export const handleTranfer = async (req: Request & RequestAlt, res: Response) => {
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
  const account = await accountModel.findOne({ user: req.user._id })
  if(!account) throw new BadRequestError("Account not found")
  if(account?.balance < req.body.amount) throw new BadRequestError("Insufficient Funds")


  // Create Transaction
  const transaction = await transactionModel.create({...req.body})

  const tokenPin = generateRandNumber(6)

  // Generate Token
  const token = await tokenModel.create({
    transaction: transaction._id,
    user: req.user._id,
    token: tokenPin
  })

  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${req?.user?.name},</p>
    <p style="${MESSAGE_STYLES}">Transaction initiated, use this token to complete the transaction.</p>
    <p style="${MESSAGE_STYLES} font-size: 2.5rem; font-weight: bold; color: #333;">${token.token}</p>
  `

  let message = TRANSACTION_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(req?.user?.email!, "Transaction Notification", message)

  res.status(200).send(response("Transaction initiated \n A Token was sent to your email", { ...transaction }, true))
}

export const handleTranferAdmin = async (req: Request | any, res: Response) => {
  if(!req.params.account) throw new BadRequestError("Account id is required");
  if(!req.user) throw new UnAuthorizedError("Not authenticated")

  // Create Transaction
  const transaction = await transactionModel.create({...req.body, verified: true})
  res.status(200).send(response("Transaction Created", transaction, true))
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

  // Get Admin Account
  const adminAccount = await accountModel.findOne({ user: req.user._id })!

  // Create transaction
  await transactionModel.create({

    amount: req.body.amount,
    sender: adminAccount?._id,
    type: "deposit",
    status: "approved",
    isCredit: true,
    receiver: account?.accountNumber,
    verified: true
  })

  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${account?.user?.name},</p>
    <p style="${MESSAGE_STYLES}">Your account was credited with $${Number(req.body?.amount).toLocaleString()}.</p>
  `

  let message = TRANSACTION_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(account?.user?.email!, "Transaction Notification", message)


  res.status(200).send(response("Account credited", account))
}

export const handleGetAllAccounts = async (req: Request | any, res: Response) => {
  const accounts = await accountModel.find({ isAdmin: false }).populate("user")
  res.status(200).send(response("Users Accounct", accounts))
}
