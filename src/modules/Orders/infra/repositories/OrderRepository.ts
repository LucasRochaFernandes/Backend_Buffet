import { ICreateOrderDTO } from "@modules/Orders/dtos/ICreateOrderDTO";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { Order } from "../entities/Order";

export class OrderRepository implements IOrderRepository{
    async create(data: ICreateOrderDTO): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    
}