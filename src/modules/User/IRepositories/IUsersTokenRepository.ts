import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersToken } from "../infra/entities/UsersToken";

export interface IUsersTokenRepository {
  create(data: ICreateUsersTokenDTO): Promise<UsersToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersToken>;
  deleteById(userToken_id: string): Promise<void>;
  findUserByRefreshToken(token: string): Promise<UsersToken>;
}
