import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

export default (app: Application) => {
  app.use(cors({ origin: "*" }));
  app.use(morgan("short"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};
