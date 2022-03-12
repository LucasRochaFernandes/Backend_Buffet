import { ProductType } from "../infra/entities/Inventory";

export interface IChangeInInventoryDTO {
  product_id: string;
  name?: string;
  description?: string;
  type?: ProductType;
  price?: number;
  turnAvailable?: boolean;
  amount_available?: number;
}
