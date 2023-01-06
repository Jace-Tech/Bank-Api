import { response } from "./../utils/response";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import { BadRequestError } from "../utils/customError";
import accountModel from "../models/account.model";

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

  await user?.delete();
  await accountModel.deleteOne({ user: id });
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
