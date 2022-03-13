import { ICreateOrderDTO } from "@modules/Orders/dtos/ICreateOrderDTO";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository,
    @inject("OrderRepository") private orderRepository: IOrderRepository
  ) {}

  async execute(data: ICreateOrderDTO): Promise<void> {
    await this.orderRepository.create(data);
  }
}
