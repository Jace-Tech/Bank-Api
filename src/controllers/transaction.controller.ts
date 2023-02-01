import { response } from './../utils/response';
import { Response } from 'express';
import { Request } from 'express';
import transactionModel from '../models/transaction.model';


export const handleGetAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({}, { __v: 0 }).populate(["sender", "receiver"]).sort({ createdAt: 'desc' }).exec()
  res.status(200).send(response("All transactions", transactions, true))
}