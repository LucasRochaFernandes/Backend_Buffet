import { ICreateOrderDTO } from "@modules/Orders/dtos/ICreateOrderDTO";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

export class OrderRepository implements IOrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }
  async getById(order_id: string): Promise<Order> {
    return await this.repository.findOne(order_id);
  }

  async create(data: ICreateOrderDTO): Promise<Order> {
    const newOrder = this.repository.create(data);
    return await this.repository.save(newOrder);
  }
}
