import { ITurnAdminDTO } from "@modules/User/dtos/ITurnAdminDTO";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class TurnAdminUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(data: ITurnAdminDTO): Promise<void> {
    const { user_id } = data;
    const userExists = await this.userRepository.getProfileUser(user_id);

    if (!userExists) {
      throw new AppError("User not exists");
    }

    await this.userRepository.turnAdmin(data);
  }
}
