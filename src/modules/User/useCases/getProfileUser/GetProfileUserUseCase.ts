import { User } from "@modules/User/infra/entities/User";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetProfileUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(email: string): Promise<User> {
    const userProfile = await this.userRepository.getProfileUser(email);

    if (!userProfile) {
      throw new AppError("User not found");
    }

    return userProfile;
  }
}
