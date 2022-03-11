import { ResetPasswordUserController } from "@modules/User/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/User/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailProvider = new SendForgotPasswordMailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailProvider.handle);
passwordRoutes.patch("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
