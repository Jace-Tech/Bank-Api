import { ACCOUNT_TEMPLATE, ADMIN_NOTIFICATION, MESSAGE_STYLES } from './../templates/index';
import { sendMail } from '../utils/mailer';
import { generateRandNumber, generateAccountNumber } from './../utils/functions';
import { generateToken } from './../utils/token';
import { Response, Request } from 'express';
import User from "./../models/user.model"
import Account from "./../models/account.model"
import dotenv from "dotenv"

dotenv.config()

import { BadRequestError, NotFoundError } from '../utils/customError';
import { response } from '../utils/response';
import path from 'path';
import userModel from './../models/user.model';
import notificationModel from '../models/notification.model';

export const handleSignUp = async (req: Request, res: Response) => {
  if(!req.body.name) throw new BadRequestError("Name is required")
  if(!req.body.email) throw new BadRequestError("Email is required")
  if(!req.body.password) throw new BadRequestError("Password is required")
  if(!req.body.accountType) throw new BadRequestError("Account type is required")

  // Check if user already exists
  let user = await User.findOne({ email: req.body.email })
  if(user) throw new BadRequestError("User already exists")

  // Create a new user 
  user = await User.create({ ...req.body })

  // Create an account
  const account = await Account.create({
    user: user._id,
    IBAN: generateRandNumber(12),
    accountType: req.body.accountType,
    pin: generateRandNumber(4),
    accountNumber:  generateAccountNumber(),
    accountName: user.name,
    routingNumber: generateRandNumber(9)
  })

  // Send Email
  let message = ACCOUNT_TEMPLATE
  message = message.replace("{{ firstname }}", user.name)
  message = message.replace("{{ bankName }}", process.env.APP_NAME!)
  message = message.replace("{{ accountNumber }}", account.accountNumber)
  message = message.replace("{{ accountPin }}", account.pin)
  message = message.replace("{{ accountType }}", account.accountType)
  message = message.replace("{{ iban }}", account.IBAN)
  message = message.replace("{{ year }}", new Date().getFullYear().toString())



  await sendMail(user.email, `Welcome to ${process.env.APP_NAME}`, message)

  // Notify Admin
  // Check if there's admin
  const admin = await userModel.findOne({ role: "admin" })
 
  if(admin) {
    // Send Email
    let adminText = `
      <p style="${MESSAGE_STYLES}">
        <b>Hello Sir</b>,
      </p> 
      <p style="${MESSAGE_STYLES}">
        <b>A new user just signed up; Name: <b>${user?.name}</b>, generated Account Number: <b>${account.accountNumber}</b>
      </p> 
    `;

    let adminMessage = ADMIN_NOTIFICATION;
    adminMessage.replace("{{ message }}", adminText);
    adminMessage.replace("{{ year }}", new Date().getFullYear().toString());

    await sendMail(admin?.email, "Registration Notification", adminMessage);

     // Create Notification
    await notificationModel.create({
      user: admin._id,
      message: `${user?.name} Created an account now`,
      type: "registration",
      from: user._id
    })
  }

  // Send response
  const data = { 
    id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    role: user.role,
    accountNumber: account.accountNumber,
    accountType: account.accountType,
    balance: account.balance,
    accountId: account._id,
    accountName: account.accountName,
  }

  res.status(201).send(response("User created", data, true))
}

export const handleSignIn = async (req: Request, res: Response) => {
  if(!req.body.email) throw new BadRequestError("Email is required")
  if(!req.body.password) throw new BadRequestError("Password is required")

  // Check if user already exists
  let user = await User.findOne({ email: req.body.email, password: req.body.password }, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 })
  if(!user) throw new NotFoundError("Incorrect Crediential")

  // Generate Token
  const token = generateToken({ userId: user._id as any, role: user.role })

  // Send response
  res.status(200).send(response("Logged in successfully", {user, token}))
}

export const handleAdminSignUp = async (req: Request, res: Response) => {
  if(!req.body.name) throw new BadRequestError("Name is required")
  if(!req.body.email) throw new BadRequestError("Email is required")
  if(!req.body.password) throw new BadRequestError("Password is required")

  // Check if user already exists
  let user = await User.findOne({ email: req.body.email })
  if(user) throw new BadRequestError("User already exists")
  
  
  user = await User.create({ ...req.body, role: "admin" })

  // Create an account
  const account = await Account.create({
  user: user._id,
  IBAN: generateRandNumber(12),
  accountType: "Savings Account",
  pin: generateRandNumber(4),
  accountNumber:  generateAccountNumber(),
  accountName: user.name,
  balance: 999_999_999_999,
  isAdmin: true,
  routingNumber: generateRandNumber(9)
})
  res.status(201).send(response("Account created!", user))
}