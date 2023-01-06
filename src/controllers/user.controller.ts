import { response } from './../utils/response';
import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { BadRequestError } from '../utils/customError';

export const handleGetAllUsers = async (req: Request, res: Response) => {
  let users = await userModel.find({}, {__v: 0})
  users = users.filter(user => user.role !== "admin")
  res.status(200).send(response("All users", users))
}

export const handleGetOneUsers = async (req: Request, res: Response) => {
  const { id } = req.params
  if(!id) throw new BadRequestError("id required")

  const user = await userModel.findOne({ _id:id}, {__v: 0})
  res.status(200).send(response("User", user))
}

export const handleDeletetOneUsers = async (req: Request, res: Response) => {
  const { id } = req.params
  if(!id) throw new BadRequestError("id required")

  const user = await userModel.findOneAndDelete({ _id:id}, {__v: 0})
  res.status(200).send(response("User", user))
}