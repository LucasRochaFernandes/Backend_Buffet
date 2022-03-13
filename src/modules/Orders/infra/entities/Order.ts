import { User } from "@modules/User/infra/entities/User";
import { v4 as uuidV4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

 export enum OrderType {
  LOCAL = "local",
  DELIVERY = "delivery",
}

export enum PaymentOrder {
  PIX = "pix",
  CASH = "cash",
  CARD = "card",
}
@Entity("orders")
export class Order {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  type: OrderType;

  @Column()
  done: boolean;

  @Column()
  total: number;

  @Column()
  finished_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  payment: PaymentOrder;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
