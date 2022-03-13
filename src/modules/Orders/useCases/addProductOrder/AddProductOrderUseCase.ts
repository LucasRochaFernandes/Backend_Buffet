import { ICreateProductOrderDTO } from "@modules/Orders/dtos/ICreateProductOrderDTO";
import { Order } from "@modules/Orders/infra/entities/Order";
import { ProductsOrder } from "@modules/Orders/infra/entities/ProductsOrder";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddProductOrderUseCase {
  constructor(
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository,
    @inject("OrderRepository") private orderRepository: IOrderRepository,
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute({
    product_id,
    order_id,
    product_amount,
  }: ICreateProductOrderDTO): Promise<ProductsOrder[]> {
    const product = await this.inventoryRepository.getById(product_id);

    if (!product) {
      throw new AppError("Product not exists");
    }

    const total_product_price: number = product.price * product_amount;

    const order = await this.orderRepository.getById(order_id);

    if (!order) {
      throw new AppError("Order not exists");
    }

    order.total = Number(order.total) + Number(total_product_price);

    await this.orderRepository.create(order);

    product.amount_available -= Number(product_amount);

    if (product.amount_available < 0) {
      throw new AppError("product amount unavailable");
    } else {
      await this.inventoryRepository.create(product);
    }

    return await this.productsOrderRepository.create({
      product_id,
      order_id,
      product_amount,
      total_product_price,
    });
  }
}
