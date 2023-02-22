import { LOAN_TEMPLATE, MESSAGE_STYLES, ADMIN_NOTIFICATION } from './../templates/index';
import { UnAuthorizedError } from './../utils/customError';
import { response } from './../utils/response';
import { sendMail } from './../utils/mailer';
import { BadRequestError, NotFoundError } from '../utils/customError';
import { Response } from 'express';
import { Request } from 'express';
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
    <p style="${MESSAGE_STYLES}">Hi ${user?.name},</p>
    <p style="${MESSAGE_STYLES}">Your request to loan $${Number(req.body.amount).toLocaleString()} has been sent, We'll notify you on any further development.</p>
  `

  let message = LOAN_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user?.email!, "Transaction Notification", message)

  // Notify admin
  const admin = await userModel.findOne({ role: "admin" })

  if(admin) {
    // Send Email
    let adminText = `
      <p style="${MESSAGE_STYLES}">
        <b>Hello Sir</b>,
      </p> 
      <p style="${MESSAGE_STYLES}">
        <b>${user?.name}</b> with Account Number of <b>${req.body.account}</b> has applied for a Loan request of <b>$${req.body.amount}</b>
      </p> 
    `;

    let adminMessage = ADMIN_NOTIFICATION;
    adminMessage.replace("{{ message }}", adminText);
    adminMessage.replace("{{ year }}", new Date().getFullYear().toString());

    await sendMail(admin?.email, "Loan Request Notification", adminMessage);

    await notificationModel.create({
      user: admin._id,
      message: `${user?.name} is requesting for a loan`,
      type: "loan",
      from: req.body.user
    })
  }

  res.status(200).send(response("Loan request sent", null))
}

export const handleApproveLoan = async (req: Request, res: Response) => {	 
  if(!req.params.id) throw new BadRequestError("Loan Id is required")
  if(!req.body.date) throw new BadRequestError("Date is required")
  if(!req.body.interest) throw new BadRequestError("Interest is required")

  // Check Loan
  const loan = await loanModel.findById(req.params.id)
  if(!loan) throw new NotFoundError("Loan request is not found")

  // Check User
  const user = await userModel.findById(loan.user)
  if(!user) throw new NotFoundError("No user found")
  if(!user.isActive) throw new UnAuthorizedError("User account is disabled")

  // Update the loan
  loan.interest = req.body.interest
  loan.endDate = Date.parse(req.body.date) as any
  loan.status = "active"
  await loan.save()

  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${user?.name},</p>
    <p style="${MESSAGE_STYLES}">Your request for the loan of $${Number(loan.amount).toLocaleString()} has been approved, You'll be paying back the total sum of $${req.body.interest} by (${new Date(req.body.date).toString()})</p>
  `

  let message = LOAN_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user?.email!, "Loan Notification", message)

  res.status(200).send(response("Loan request activated", null))
}

// TODO: 
// - Admin will approve loan
// - Admin will add interest
// - Admin will add date

export const handleUsersLoan = async (req: Request, res: Response) => {	 
  if(!req.params.userId) throw new BadRequestError("User ID is required")

  const user = await userModel.findById(req.body.user)
  if(!user) throw new NotFoundError("User not found")

  if(!user.isActive) throw new UnAuthorizedError("User account is disabled")

  const usersLoan = await loanModel.find({ user: req.params.userID }).populate("user")
  res.status(200).send(response("Users loans", usersLoan))
}

export const handleAllLoans = async (req: Request, res: Response) => {	 
  const usersLoan = await loanModel.find({ }).populate("user").sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("Users loans", usersLoan))
}

export const handleDeleteLoan = async (req: Request, res: Response) => {	 
  if(!req.params.id) throw new BadRequestError("Loan id is required");
  const usersLoan = await loanModel.findByIdAndDelete(req.params.id)
  res.status(200).send(response("Loan deleted", usersLoan))
}

export const handleCancelLoan = async (req: Request, res: Response) => {	 
  if(!req.params.id) throw new BadRequestError("Loan id is required");
  const loan = await loanModel.findById(req.params.id)
  if(!loan) throw new NotFoundError("Loan record not found");

  const user = await userModel.findById(loan.user)
  if(!user) throw new NotFoundError("User not found")
  if(!user.isActive) throw new UnAuthorizedError("User account is disabled")

  // Send Email
  const text = `
    <p style="${MESSAGE_STYLES}">Hi ${user?.name},</p>
    <p style="${MESSAGE_STYLES}">Your request for the loan of $${Number(loan.amount).toLocaleString()} has been cancelled, for further inquiries you can contact our customer support.</p>
  `

  let message = LOAN_TEMPLATE
  message = message.replace("{{ message }}", text)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())

  await sendMail(user?.email!, "Loan notification", message)


  res.status(200).send(response("Loan Cancelled", null))
}