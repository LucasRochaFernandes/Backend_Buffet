import { ICreateUserDTO } from "@modules/User/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { email } = data;
    const { password } = data;


    const emailAlreadyExists = await this.userRepository.getProfileUser(email);

    if (emailAlreadyExists) {
      throw new AppError("User already exists");
    }

    data.password = await hash(password, 8);

    await this.userRepository.create(data);
  }
}
