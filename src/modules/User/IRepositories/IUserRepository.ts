import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { ITurnAdminDTO } from "../dtos/ITurnAdminDTO";
import { User } from "../infra/entities/User";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  turnAdmin(data: ITurnAdminDTO): Promise<void>;
  getProfileUser(username: string): Promise<User>;
  getById(user_id: string): Promise<User>;
  isAdmin(user_id: string): Promise<boolean>;
}
