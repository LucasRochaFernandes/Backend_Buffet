import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export enum ProductType {
  SALTY = "salty",
  CANDY = "candy",
}

@Entity("inventory")
export class Inventory {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: ProductType;

  @Column()
  price: number;

  @Column()
  available: boolean;

  @Column()
  amount_available: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
