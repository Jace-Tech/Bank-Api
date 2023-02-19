import { response } from './../utils/response';
import { BadRequestError, NotFoundError, ServerError } from './../utils/customError';
import { Request, Response } from 'express';
import allowedModel from '../models/allowed.model';
import accountModel from '../models/account.model';


export const handleCreateAllowed = async (req: Request, res: Response) => {	 
  if(!req.params.userId) throw new BadRequestError("User ID is required")
  if(!req.body.bank) throw new BadRequestError("Body is required")
  if(!req.body.accountNumber) throw new BadRequestError("Account number is required")

  const account = await accountModel.findOne({ user: req.params.userId })
  if(!account) throw new NotFoundError("No account found")

  // Check if account already exists
  const allowed = await allowedModel.findOne({ accountNumber: req.body.accountNumber })
  if(allowed) throw new BadRequestError("Account number already exists for this user");

  // if(account.accountNumber === req.body.accountNumber) throw new BadRequestError("Can")

  const record = await allowedModel.create({ 
    user: req.params.userId, 
    accountNumber: req.body.accountNumber,  
    bank: req.body.bank
  })
  if(!record) throw new ServerError("Failed to create record");

  res.status(201).send(response("Added Record", record, true))
}

export const deleteAllowed = async (req: Request, res: Response) => {	 
  if(!req.params.allowId) throw new BadRequestError("Record ID is required")

  const record = await allowedModel.findOne({ _id: req.params.allowId })
  if(!record) throw new NotFoundError("Record not found")
  await record.deleteOne()
  res.status(200).send(response("Record deleted", record))
}

export const handleGetUsersAllowed = async (req: Request, res: Response) => {	 
  if(!req.params.id) throw new BadRequestError("User ID is required")

  const record = await allowedModel.find({ user: req.params.id })
  res.status(200).send(response("Users Record", record))
}

export const updateAllowed = async (req: Request, res: Response) => {	 
  if(!req.params.allowId) throw new BadRequestError("Record ID is required")

  const record = await allowedModel.findOne({ _id: req.params.allowId })
  if(!record) throw new NotFoundError("Record not found")

  record.user = req.body.user || record.user,
  record.accountNumber = req.body.accountNumber || record.accountNumber,
  record.bank = req.body.bank || record.bank,

  await record.save()

  res.status(200).send(response("Record Updated", record))
}