import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const ordersRoutes = Router();

import { CreateOrderController } from "@modules/Orders/useCases/createOrder/CreateOrderController";
const createOrderController = new CreateOrderController();

import { AddProductOrderController } from "@modules/Orders/useCases/addProductOrder/AddProductOrderController";
const addProductOrderController = new AddProductOrderController();

ordersRoutes.post("/", ensureAuthenticate, createOrderController.handle);

ordersRoutes.patch(
  "/:order_id/:product_id",
  ensureAuthenticate,
  addProductOrderController.handle
);

export { ordersRoutes };
