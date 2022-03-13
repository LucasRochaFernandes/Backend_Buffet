import { IRemoveProductOrderDTO } from "@modules/Orders/dtos/IRemoveProductOrderDTO";
import { ProductsOrder } from "@modules/Orders/infra/entities/ProductsOrder";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class RemoveProductOrderUseCase {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository,
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository
  ) {}
  async execute({
    product_id,
    order_id,
  }: IRemoveProductOrderDTO): Promise<ProductsOrder[]> {
    const order = await this.orderRepository.getById(order_id);

    if (!order) {
      throw new AppError("Order does not exists");
    }
    if (order.done) {
      throw new AppError("Order already done");
    }

    const productOrder =
      await this.productsOrderRepository.getByProductandOrderId(
        product_id,
        order_id
      );

    order.total =
      Number(order.total) - Number(productOrder.total_product_price);

    return await this.productsOrderRepository.deleteProductOrder(
      productOrder.id
    );
  }
}
