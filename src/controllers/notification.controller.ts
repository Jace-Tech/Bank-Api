import { response } from './../utils/response';
import { Request, Response } from 'express';
import notificationModel from '../models/notification.model';

export const handleGetAllNotification = async (req: Request, res: Response) => {	 
  const notifications = await notificationModel.find({}).populate(['user', 'from']) 
  res.status(200).send(response("All notifications", notifications))
}