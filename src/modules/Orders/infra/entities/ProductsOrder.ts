import { Inventory } from "../../../Products/infra/entities/Inventory";
import { v4 as uuidV4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity("products_order")
export class ProductsOrder {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  product_id: string;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: "product_id" })
  product: Inventory;

  @Column()
  product_amount: number;

  @Column()
  total_product_price: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
