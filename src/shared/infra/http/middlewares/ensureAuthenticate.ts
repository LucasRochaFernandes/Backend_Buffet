import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

import auth from "@config/auth";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
    request.user_id = user_id;
  } catch {
    throw new AppError("Invalid token", 401);
  }

  next();
}
