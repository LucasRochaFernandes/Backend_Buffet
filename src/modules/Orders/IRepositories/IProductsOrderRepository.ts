import { ICreateProductOrderDTO } from "../dtos/ICreateProductOrderDTO";

export interface IProductsOrderRepository {
  create(data: ICreateProductOrderDTO): Promise<void>;
}
