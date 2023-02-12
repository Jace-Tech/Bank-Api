import { sendMail } from './../utils/mailer';
import fs from 'fs/promises';
import { BadRequestError, NotFoundError } from './../utils/customError';
import { response } from './../utils/response';
import { Response } from 'express';
import { Request } from 'express';
import transactionModel from '../models/transaction.model';
import path from 'path';


export const handleGetAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({}, { __v: 0 }).populate(["sender", "receiver"]).sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All transactions", transactions, true))
}


export const handleApproveTransaction = async (req: Request, res: Response) => {
  if(!req.params.transactId) throw new BadRequestError("Transaction ID is required")

  const transaction = await transactionModel.findById(req.params.transactId).populate(["sender"]) as any
  if(!transaction) throw new NotFoundError("Transaction not found")

  // Update transaction status
  transaction.status = "approved"
  await transaction.save()

  // Send Email
  const text = `
    <p class="message">Hi ${transaction.sender?.name},</p>
    <p class="message">Your request to ${transaction.type} $${transaction.amount.toLocaleString()} has been approved and completed</p>
  `

  let message = await fs.readFile(path.join(path.dirname(__filename), "../templates/transaction.html"), "utf-8")
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(transaction?.sender?.email!, "Transaction Notification", message)

  res.status(200).send(response("Transaction Approved", transaction))
}


export const handleBackdate = async (req: Request, res: Response) => {
  if(!req.params.transactId) throw new BadRequestError("Transaction ID is required")
  if(!req.body.date) throw new BadRequestError("Date is required")

  const transaction = await transactionModel.findById(req.params.transactId)
  if(!transaction) throw new NotFoundError("Transaction not found")

  transaction.createdAt = new Date(req.body.date)
  await transaction.save()

  res.status(200).send(response("Transaction Updated", transaction))
}

