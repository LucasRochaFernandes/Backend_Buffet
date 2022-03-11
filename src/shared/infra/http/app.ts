import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "@shared/containers";

import createConnection from "@shared/infra/typeorm";
createConnection();


import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statuscode).json({
        message: err.message,
      });
    } else {
      return response.status(500).json({
        status: "error",
        message: `Internal server error = ${err.message}`,
      });
    }
  }
);

export { app };
