import { response } from "./../utils/response";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import { BadRequestError, NotFoundError } from "../utils/customError";
import accountModel from "../models/account.model";
import loanModel from "../models/loan.model";
import transactionModel from "../models/transaction.model";
import allowedModel from "../models/allowed.model";

export const handleGetAllUsers = async (req: Request, res: Response) => {
  let users = await userModel.find({}, { __v: 0 });
  users = users.filter((user) => user.role !== "admin");
  res.status(200).send(response("All users", users));
};

export const handleGetOneUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("id required");

  const user = await userModel.findOne({ _id: id }, { __v: 0 });
  res.status(200).send(response("User", user));
};

export const handleDeletetOneUsers = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("id required");
  const user = await userModel.findOne({ _id: id }, { __v: 0 });
  if (user?._id != id && req.role === "user")
    throw new BadRequestError("Unauthorized!");

  // Delete User 
  await user?.delete();
  
  // Delete User Account
  await accountModel.deleteOne({ user: id });

  // Delete User Loan
  await loanModel.deleteOne({ user: id });

  // Delete User Transactions
  await transactionModel.deleteOne({ user: id });
  
  // Delete User Allowed List
  await allowedModel.deleteOne({ user: id });
  
  // Delete User Allowed List
  await allowedModel.deleteOne({ user: id });
  
  res.status(200).send(response("User deleted", user));
};

export const handleGetUserAccount = async (req: Request | any, res: Response ) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("id required");
  const account = await accountModel.findOne({ user: id }, { __v: 0 }).populate(['user']);
  if (account?.user != id && req.role === "user") throw new BadRequestError("Unauthorized!");

  res.status(200).send(response("User account", account));
};

export const handleGetAllUsersAndAccounts = async ( req: Request, res: Response ) => {
  const accounts = await accountModel.find({}, {__v: 0}).populate(["user"])
  res.status(200).send(response("User accounts", accounts));
};

export const handleGetUsersAccounts = async (req: Request | any, res: Response) => {
  const accounts = await accountModel.find({}, { __v: 0 });
  res.status(200).send(response("User accounts", accounts));
};

export const handleBlockUser = async (req: Request, res: Response) => {	 
  if(!req.params.userId) throw new BadRequestError("User ID is required")

  // Check if there's a user
  const user = await userModel.findOne({ _id: req.params.userId })
  if(!user) throw new NotFoundError("No user found with that ID")

  // Update the record
  user.isActive = false
  await user.save()

  res.status(200).send(response("User account blocked", user))
}

export const handleUnblockUser = async (req: Request, res: Response) => {	 
  if(!req.params.userId) throw new BadRequestError("User ID is required")

  // Check if there's a user
  const user = await userModel.findOne({ _id: req.params.userId })
  if(!user) throw new NotFoundError("No user found with that ID")

  if(user.isActive) return res.status(304).send(response("User is already active", user))

  // Update the record
  user.isActive = true
  await user.save()

  res.status(200).send(response("User account activated", user))
}