import { ProductType } from "../infra/entities/Inventory";

export interface IListInventoryDTO {
  type?: ProductType;
  maxPrice?: number;
  name?: string;
  available?: boolean;
}
