import { IChangeInInventoryDTO } from "../dtos/IChangeInInventoryDTO";
import { ICreateInInventoryDTO } from "../dtos/ICreateInInventoryDTO";
import { Inventory, ProductType } from "../infra/entities/Inventory";

export interface IInventoryRepository {
  create(data: ICreateInInventoryDTO): Promise<Inventory>;
  chageProduct(data: IChangeInInventoryDTO): Promise<Inventory>;
  deleteProduct(product_id: string): Promise<void>;
}
