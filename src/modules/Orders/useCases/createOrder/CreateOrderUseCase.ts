import { ICreateOrderDTO } from "@modules/Orders/dtos/ICreateOrderDTO";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository
  ) {}

  async execute(data: ICreateOrderDTO): Promise<void> {}
}
