import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/containers/providers/MailProvider/IMailProvider";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("MailProvider") private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.getProfileUser(email);

    if (!user) {
      throw new AppError("User not found");
    }

    const token = uuidv4();

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addHours(3),
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassoword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PASSWORD_URL}${token}`,
    };


    await this.mailProvider.sendMail(
      email,
      "Recuperação da senha",
      variables,
      templatePath
    );

  }
}
