import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const ordersRoutes = Router();

import { CreateOrderController } from "@modules/Orders/useCases/createOrder/CreateOrderController";
const createOrderController = new CreateOrderController();

import { AddProductOrderController } from "@modules/Orders/useCases/addProductOrder/AddProductOrderController";
const addProductOrderController = new AddProductOrderController();

import { RemoveProductOrderController } from "@modules/Orders/useCases/removeProductOrder/RemoveProductOrderController";
const removeProductOrderController = new RemoveProductOrderController();

ordersRoutes.post("/", ensureAuthenticate, createOrderController.handle);

ordersRoutes.patch(
  "/:order_id/:product_id",
  ensureAuthenticate,
  addProductOrderController.handle
);

ordersRoutes.delete(
  "/:order_id",
  ensureAuthenticate,
  removeProductOrderController.handle
);

export { ordersRoutes };
