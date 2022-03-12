import { User } from "@modules/User/infra/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

export enum OrderType {
  LOCAL = "local",
  DELIVERY = "delivery",
}

@Entity("orders")
export class Orders {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
