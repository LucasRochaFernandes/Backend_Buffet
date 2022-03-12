import { ProductType } from "../infra/entities/Inventory";

export interface ICreateInInventoryDTO {
  id?: string;
  name: string;
  description?: string;
  price: number;
  type: ProductType;
  available?: boolean;
  amount_available: number;
  created_at?: Date;
}
