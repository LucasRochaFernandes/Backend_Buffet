import { Router } from "express";
const inventoryRoutes = Router();

import multer from "multer";
import upload from "@config/upload";
const uploadProductImages = multer(upload.upload("./tmp/products"));

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateProductInInventoryController } from "@modules/Products/useCases/createProductInInventory/CreateProductInInventoryController";
const createInventoryController = new CreateProductInInventoryController();

import { ChangeProductController } from "@modules/Products/useCases/changeProduct/ChangeProductController";
const changeProductController = new ChangeProductController();

import { DeleteProductController } from "@modules/Products/useCases/deleteProductInInventory/DeleteProductController";
const deleteProductController = new DeleteProductController();

import { ListInventoryController } from "@modules/Products/useCases/listInventory/ListInventoryController";
const listInventoryController = new ListInventoryController();

import { ImportImagesController } from "@modules/Products/useCases/importImagesForProducts/importImagesController";
const importImagesProductController = new ImportImagesController();

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

inventoryRoutes.post(
  "/:product_id/images",
  ensureAuthenticate,
  ensureAdmin,
  uploadProductImages.array("images"),
  importImagesProductController.handle
);

inventoryRoutes.delete("/:product_id/images/:filename", ensureAuthenticate, ensureAdmin, )

inventoryRoutes.get("/", listInventoryController.handle);

export { inventoryRoutes };
