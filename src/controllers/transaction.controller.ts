import { MESSAGE_STYLES } from './../templates/index';
import { sendMail } from './../utils/mailer';
import { BadRequestError, NotFoundError, UnAuthorizedError } from './../utils/customError';
import { response } from './../utils/response';
import { Response } from 'express';
import { Request } from 'express';
import transactionModel from '../models/transaction.model';
import userModel from '../models/user.model';
import { TRANSACTION_TEMPLATE } from '../templates';


export const handleGetAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({}, { __v: 0 }).populate("sender").sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All transactions", transactions, true))
}

export const handleGetUsersTransaction = async (req: Request, res: Response) => {
  if(!req.params.userId) throw new BadRequestError("User ID is required")

  const user = await userModel.findOne({ _id: req.params.userId })
  if(!user) throw new NotFoundError("User not found")
  if(!user?.isActive) throw new UnAuthorizedError("User account is disabled")

  const transactions = await transactionModel.find({ sender: req.params.userId }, { __v: 0 }).populate(["sender"]).sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All user transactions", transactions, true))
}


export const handleApproveTransaction = async (req: Request, res: Response) => {
  if(!req.params.transactId) throw new BadRequestError("Transaction ID is required")

  const transaction = await transactionModel.findById(req.params.transactId).populate(["sender"]) as any
  if(!transaction) throw new NotFoundError("Transaction not found")

  // Update transaction status
  transaction.status = "approved"
  await transaction.save()

  // Get users
  const user = await userModel.findById(transaction?.sender?._id)
  if(!user) throw new NotFoundError("User not found");


  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${transaction.sender?.name},</p>
    <p style="${MESSAGE_STYLES}">Your request to ${transaction.type} $${transaction.amount.toLocaleString()} has been approved and completed</p>
  `

  let message = TRANSACTION_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user.email, "Transaction Notification", message)

  res.status(200).send(response("Transaction Approved", transaction))
}

export const handleCancelTransaction = async (req: Request, res: Response) => {
  if(!req.params.transactId) throw new BadRequestError("Transaction ID is required")

  const transaction = await transactionModel.findById(req.params.transactId).populate(["sender"]) as any
  if(!transaction) throw new NotFoundError("Transaction not found")

  // Get users
  const user = await userModel.findById(transaction?.sender?.user)
  if(!user) throw new NotFoundError("User not found");

  // Update transaction status
  transaction.status = "declined"
  await transaction.save()


  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${transaction.sender?.name},</p>
    <p style="${MESSAGE_STYLES}">Your request to ${transaction.type} $${transaction.amount.toLocaleString()} has been declined, please contact the customer service for further details. </p>
  `

  let message = TRANSACTION_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user.email, "Transaction Notification", message)

  res.status(200).send(response("Transaction declined", transaction))
}


export const handleBackdate = async (req: Request, res: Response) => {
  if(!req.params.transactId) throw new BadRequestError("Transaction ID is required")
  if(!req.body.date) throw new BadRequestError("Date is required")

  const transaction = await transactionModel.findByIdAndUpdate(req.params.transactId, {
    $set: {
      date: Date.parse(req.body.date) as any
    }
  }, { new: true })
  if(!transaction) throw new NotFoundError("Transaction not found")


  res.status(200).send(response("Transaction Updated", transaction))
}


export const handleDeleteTransaction = async (req: Request | any, res: Response) => {
  if(!req.params.id) throw new BadRequestError("Transaction id is required")

  const transaction = await transactionModel.findByIdAndDelete(req.params.id)
  res.status(200).send(response("Transaction deleted", transaction))
}