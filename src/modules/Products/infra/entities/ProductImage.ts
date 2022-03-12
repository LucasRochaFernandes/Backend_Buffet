import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Inventory } from "./Inventory";

@Entity("product_images")
export class ProductImage {
  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: "product_id" })
  product: Inventory;

  @Column()
  product_id: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
