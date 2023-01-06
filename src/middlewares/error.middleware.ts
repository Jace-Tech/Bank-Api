import { Request, Response, NextFunction, Application } from "express";
import { response } from "../utils/response";

export default (app: Application) => {
  // Invalid Routes
  app.use("*", (req: Request, res: Response) => {
    res.status(200).send(response("Invalid Route", null, false));
  });

  const errorNames = [
    "CastError",
    "JsonWebTokenError",
    "ValidationError",
    "SyntaxError",
    "MongooseError",
    "MongoError",
  ];

  const errorTypes = ["BadRequestError", "NotFoundError", "ServerError", "UnAuthorizedError", "CustomError"]

  // Error Routes
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    if (errorTypes.includes(error.name)) {
      res.status(error.statusCode).send(response(error.message, null, false));
    } else if (error.name == "MongoError" && error.code == 11000) {
      // Catch duplicate key field error
      const field = Object.entries(error.keyValue)[0][0];
      res.status(400).send(response(`${field} already exists`, null, false));
    } else if (errorNames.includes(error.name)) {
      res.status(400).send(response(error.message, null, false));
    } else {
      res.status(500).send(response(error.message, null, false));
    }
  });

  return app
};
