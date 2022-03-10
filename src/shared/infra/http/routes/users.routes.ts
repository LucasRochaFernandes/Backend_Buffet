import { Router } from "express";

const userRoutes = Router();

import { CreateUserController } from "@modules/User/useCases/createUser/CreateUserController";
const createUserController = new CreateUserController();

import { GetProfileUserController } from "@modules/User/useCases/getProfileUser/GetProfileUserController";
const getProfileUserController = new GetProfileUserController();

import { TurnAdminController } from "@modules/User/useCases/turnAdmin/TurnAdminController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";
const turnAdminController = new TurnAdminController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", ensureAuthenticate, getProfileUserController.handle);
userRoutes.patch(
  "/:user_id",
  ensureAuthenticate,
  ensureAdmin,
  turnAdminController.handle
);

export { userRoutes };
