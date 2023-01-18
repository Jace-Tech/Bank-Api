import { response } from './../utils/response';
import { generateRandNumber, generateDate } from './../utils/functions';
import { BadRequestError } from './../utils/customError';
import { Request, Response } from 'express';
import cardModel from '../models/card.model';


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