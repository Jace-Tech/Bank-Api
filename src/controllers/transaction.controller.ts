import { MESSAGE_STYLES, ADMIN_NOTIFICATION } from './../templates/index';
import { sendMail } from './../utils/mailer';
import { BadRequestError, NotFoundError, UnAuthorizedError } from './../utils/customError';
import { response } from './../utils/response';
import { Response } from 'express';
import { Request } from 'express';
import transactionModel from '../models/transaction.model';
import userModel from '../models/user.model';
import { TRANSACTION_TEMPLATE } from '../templates';
import { RequestAlt } from '../@types';
import tokenModel from '../models/token.model';
import accountModel from '../models/account.model';
import notificationModel from '../models/notification.model';


export const handleGetAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({ verified: true }, { __v: 0 }).populate("sender").sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All transactions", transactions, true))
}

export const handleGetUsersTransaction = async (req: Request, res: Response) => {
  if(!req.params.userId) throw new BadRequestError("User ID is required")

  const user = await userModel.findOne({ _id: req.params.userId })
  if(!user) throw new NotFoundError("User not found")
  if(!user?.isActive) throw new UnAuthorizedError("User account is disabled")

  const transactions = await transactionModel.find({ sender: req.params.userId, verified: true }, { __v: 0 }).populate(["sender"]).sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All user transactions", transactions, true))
}


export const handleTransactionVerification = async (req: Request & RequestAlt, res: Response) => {
  if(!req.params.id) throw new BadRequestError("Transaction id is required")
  if(!req.user) throw new UnAuthorizedError("User not authorized")
  if(!req.body.token) throw new UnAuthorizedError("Token is required")

  // Check token
  const token = await tokenModel.findOne({ transaction: req.params.id })
  if(!token) throw new NotFoundError("No transaction found")

  if(req.body.token !== token.token) throw new BadRequestError("Wrong token")

  // Update trasaction
  const transaction = await transactionModel.findOne({ _id: req.params.id })
  if(!transaction) throw new NotFoundError("No transaction found")
  transaction.verified = true
  transaction.status = "approved"
  await transaction.save()

  // Get account info
  const account = await accountModel.findOne({ user: req.user._id })
  if(!account) throw new NotFoundError("Account not found")

  // Update Balance
  const newBalance = account.balance - transaction?.amount
  account.balance = newBalance
  await account.save()

  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${req.user.name},</p>
    <p style="${MESSAGE_STYLES}">Your transaction of ${transaction.type} $${transaction.amount.toLocaleString()} has been completed</p>
  `

  let message = TRANSACTION_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(req.user.email!, "Transaction Notification", message)

  // Check if there's admin
  const admin = await userModel.findOne({ role: "admin" })

  if(admin) {
    // Send Email
    let adminText = `
      <p style="${MESSAGE_STYLES}">
        <b>Hello Sir</b>,
      </p> 
      <p style="${MESSAGE_STYLES}">
        <b>${req?.user?.name}</b> with account number of <b>${req.params.account}</b> just made a new transfer 
      </p> 
    `;

    let adminMessage = ADMIN_NOTIFICATION;
    adminMessage.replace("{{ message }}", adminText);
    adminMessage.replace("{{ year }}", new Date().getFullYear().toString());

    await sendMail(admin?.email, "Admin Notification", adminMessage);
    // Create Notification
    await notificationModel.create({
      user: admin._id,
      message: `${req.user.name} made a transfer of ${req.body.type} ${req.body.amount} to this account ${req.body.receiver}`,
      type: "transaction",
      from: req.user._id,
    });
  }

  res.status(200).send(response("Transaction completed", { transaction, account }, true))

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