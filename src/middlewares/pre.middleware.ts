import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

export default (app: Application) => {
  app.use(cors({ origin: "*" }));
  app.use(morgan("short"));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));

  return app;
};
