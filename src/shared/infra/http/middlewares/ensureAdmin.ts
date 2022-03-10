import { UserRepository } from "@modules/User/infra/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userRepository = new UserRepository();

  const user_id = request.user_id;

  const isAdmin = await userRepository.isAdmin(user_id);

  if (!isAdmin) {
    throw new AppError("User is not admin");
  }

  next();
}
