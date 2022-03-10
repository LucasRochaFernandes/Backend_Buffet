import { ICreateUserDTO } from "@modules/User/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { username } = data;

    const usernameAlreadyExists = await this.userRepository.getProfileUser(username);

    if (usernameAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.userRepository.create(data);
  }
}
