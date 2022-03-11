import { UserRepository } from "@modules/User/infra/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/User/infra/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokensRepository
);
