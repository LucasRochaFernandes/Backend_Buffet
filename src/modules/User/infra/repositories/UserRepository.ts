import { ICreateUserDTO } from "@modules/User/dtos/ICreateUserDTO";
import { ITurnAdminDTO } from "@modules/User/dtos/ITurnAdminDTO";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async isAdmin(user_id: string): Promise<boolean> {
    return (await this.getById(user_id)).isAdmin;
  }
  async getProfileUser(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }
  async turnAdmin({ user_id, turnAdmin }: ITurnAdminDTO): Promise<void> {
    const user = await this.getById(user_id);
    user.isAdmin = turnAdmin;
    await this.repository.save(user);
  }

  async getById(user_id: string): Promise<User> {
    return await this.repository.findOne(user_id);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create(data);
    await this.repository.save(newUser);
  }
}
