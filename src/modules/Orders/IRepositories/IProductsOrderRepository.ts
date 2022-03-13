import { ICreateProductOrderDTO } from "../dtos/ICreateProductOrderDTO";
import { Order } from "../infra/entities/Order";
import { ProductsOrder } from "../infra/entities/ProductsOrder";

export interface IProductsOrderRepository {
  create(data: ICreateProductOrderDTO): Promise<ProductsOrder[]>;
  deleteProductOrder(product_id: string): Promise<ProductsOrder[]>;
  getByOrder(order_id: string): Promise<ProductsOrder[]>;
  getOrderId(productOrder_id: string): Promise<string>;
  getById(productOrder_id: string): Promise<ProductsOrder>;
  getByProductandOrderId(
    product_id: string,
    order_id: string
  ): Promise<ProductsOrder>;
}
