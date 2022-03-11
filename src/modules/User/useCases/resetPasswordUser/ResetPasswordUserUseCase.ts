import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private userTokenRepository: IUsersTokenRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findUserByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Invalid Token, user not registered");
    }

    const tokenValid = this.dateProvider.compareIfBefore(
      this.dateProvider.dateNow(),
      userToken.expires_date
    );

    if (!tokenValid) {
      throw new AppError("Token defeated");
    }

    const user = await this.userRepository.getById(userToken.user_id);

    const newPassword = await hash(password, 8);

    user.password = newPassword;

    await this.userRepository.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}
