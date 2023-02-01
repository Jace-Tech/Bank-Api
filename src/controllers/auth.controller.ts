import fs from 'fs/promises'
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
  let message = await fs.readFile(path.join(path.dirname(__filename), "../templates/new_account.html"), "utf-8") 
  message = message.replace("{{ firstname }}", user.name)
  message = message.replace("{{ bankName }}", process.env.APP_NAME!)
  message = message.replace("{{ accountNumber }}", account.accountNumber)
  message = message.replace("{{ accountPin }}", account.pin)
  message = message.replace("{{ accountType }}", account.accountType)
  message = message.replace("{{ iban }}", account.IBAN)


  await sendMail(user.email, `Welcome to ${process.env.APP_NAME}`, message)

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

