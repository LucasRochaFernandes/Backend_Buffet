import "./providers";

import { UserRepository } from "@modules/User/infra/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/User/infra/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { container } from "tsyringe";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { InventoryRepository } from "@modules/Products/infra/repositories/InventoryRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokensRepository
);

container.registerSingleton<IInventoryRepository>(
  "InventoryRepository",
  InventoryRepository
);
