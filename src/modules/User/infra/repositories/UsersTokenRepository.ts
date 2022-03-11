import { ICreateUsersTokenDTO } from "@modules/User/dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/User/IRepositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../entities/UsersToken";

export class UsersTokensRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }
  async findUserByRefreshToken(token: string): Promise<UsersToken> {
    return await this.repository.findOne({ refresh_token: token });
  }
  async deleteById(userToken_id: string): Promise<void> {
    await this.repository.delete(userToken_id);
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersToken> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async create(data: ICreateUsersTokenDTO): Promise<UsersToken> {
    const newUserTokens = this.repository.create(data);
    await this.repository.save(newUserTokens);
    return newUserTokens;
  }
}
