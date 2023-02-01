import { Response } from 'express';
import { Request } from 'express';
import express from 'express';
import dotenv from "dotenv"
import "express-async-errors"


dotenv.config()

import preMiddleware from './middlewares/pre.middleware';
import errorMiddleware from './middlewares/error.middleware';

import swaggerui from './configs/swaggerui';
import database from './configs/database';  

import allRoutes from "./routes"


const app = express();
const PORT = process.env.PORT || 5000
const ORIGIN = process.env.ORIGIN || `http://localhost:${PORT}`

// Pre middlewares
preMiddleware(app);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Bank API" })
})

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "Hello from Bank API" })
})

// Main Routes
app.use("/api", allRoutes)

// Swagger UI
swaggerui(app)

// Error middlewares
errorMiddleware(app);

app.listen(PORT, async () => {
  await database();
  console.log(`server running at ${ORIGIN}`)
});
