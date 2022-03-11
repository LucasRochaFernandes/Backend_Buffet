import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import auth from "@config/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  private usersRepository: IUserRepository;
  private usersTokensRepository: IUsersTokenRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UserRepository") usersRepo: IUserRepository,
    @inject("UsersTokenRepository")
    usersTokenRepository: IUsersTokenRepository,
    @inject("DateProvider") dateProvider: IDateProvider
  ) {
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepo;
    this.usersTokensRepository = usersTokenRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userThisEmail = await this.usersRepository.getProfileUser(email);

    if (!userThisEmail) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, userThisEmail.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    // Gerador de md5 (IGNITE)
    const token = sign({}, auth.secret_token, {
      subject: userThisEmail.id,
      expiresIn: auth.expires_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: userThisEmail.id,
      expiresIn: auth.expires_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      user_id: userThisEmail.id,
      refresh_token,
    });

    const user = { name: userThisEmail.name, email };

    return {
      user,
      token,
      refresh_token,
    };
  }
}
