import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const ordersRoutes = Router();

import { CreateOrderController } from "@modules/Orders/useCases/createOrder/CreateOrderController";
const createOrderController = new CreateOrderController();

ordersRoutes.post("/", ensureAuthenticate, createOrderController.handle);

export { ordersRoutes };
