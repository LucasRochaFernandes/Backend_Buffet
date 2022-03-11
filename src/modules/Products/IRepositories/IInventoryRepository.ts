import { IChangeInInventoryDTO } from "../dtos/IChangeInInventoryDTO";
import { ICreateInInventoryDTO } from "../dtos/ICreateInInventoryDTO";
import { IListInventoryDTO } from "../dtos/IListInventoryDTO";
import { Inventory, ProductType } from "../infra/entities/Inventory";

export interface IInventoryRepository {
  create(data: ICreateInInventoryDTO): Promise<Inventory>;
  changeProduct(data: IChangeInInventoryDTO): Promise<Inventory>;
  deleteProduct(product_id: string): Promise<void>;
  list(data: IListInventoryDTO): Promise<Inventory[]>;
}
