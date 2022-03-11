import { Router } from "express";
const inventoryRoutes = Router();

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateProductInInventoryController } from "@modules/Products/useCases/createProductInInventory/CreateProductInInventoryController";
const createInventoryController = new CreateProductInInventoryController();

import { ChangeProductController } from "@modules/Products/useCases/changeProduct/ChangeProductController";
const changeProductController = new ChangeProductController();

import { DeleteProductController } from "@modules/Products/useCases/deleteProductInInventory/DeleteProductController";
const deleteProductController = new DeleteProductController();

inventoryRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createInventoryController.handle
);
inventoryRoutes.put(
  "/:product_id",
  ensureAuthenticate,
  ensureAdmin,
  changeProductController.handle
);

inventoryRoutes.delete(
  "/:product_id",
  ensureAuthenticate,
  ensureAdmin,
  deleteProductController.handle
);

export { inventoryRoutes };
