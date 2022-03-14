import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { Order } from "../infra/entities/Order";

export interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  getById(order_id: string): Promise<Order>;
  getByUserId(user_id: string): Promise<Order>;
}
