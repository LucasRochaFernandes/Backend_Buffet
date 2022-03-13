import { ICreateProductOrderDTO } from "@modules/Orders/dtos/ICreateProductOrderDTO";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { getRepository, Repository } from "typeorm";
import { ProductsOrder } from "../entities/ProductsOrder";

export class ProductsOrderRepository implements IProductsOrderRepository {
  private repository: Repository<ProductsOrder>;

  constructor() {
    this.repository = getRepository(ProductsOrder);
  }
  async getById(productOrder_id: string): Promise<ProductsOrder> {
    return await this.repository.findOne(productOrder_id);
  }
  async getOrderId(productOrder_id: string): Promise<string> {
    const productOrder = await this.getById(productOrder_id);
    return productOrder.order_id;
  }
  async deleteProductOrder(productOrder_id: string): Promise<ProductsOrder[]> {
    const order_id = await this.getOrderId(productOrder_id);
    await this.repository.delete(productOrder_id);
    return await this.getByOrder(order_id);
  }
  async getByOrder(order_id: string): Promise<ProductsOrder[]> {
    return await this.repository.find({ order_id });
  }

  async create(data: ICreateProductOrderDTO): Promise<ProductsOrder[]> {
    const { order_id } = data;
    const newProductOrder = this.repository.create(data);
    await this.repository.save(newProductOrder);
    return await this.getByOrder(order_id);
  }
}
