import "./providers";

import { UserRepository } from "@modules/User/infra/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/User/infra/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { container } from "tsyringe";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { InventoryRepository } from "@modules/Products/infra/repositories/InventoryRepository";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { ImageProductRepository } from "@modules/Products/infra/repositories/ImageProductRepository";
import { ProductsOrderRepository } from "@modules/Orders/infra/repositories/ProductsOrderRepository";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { OrderRepository } from "@modules/Orders/infra/repositories/OrderRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokensRepository
);

container.registerSingleton<IInventoryRepository>(
  "InventoryRepository",
  InventoryRepository
);

container.registerSingleton<IProductImagesRepository>(
  "ProductImageRepository",
  ImageProductRepository
);

container.registerSingleton<IProductsOrderRepository>(
  "ProductsOrderRepository",
  ProductsOrderRepository
);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);
