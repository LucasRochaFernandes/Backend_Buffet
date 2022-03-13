import { OrderType, PaymentOrder } from "../infra/entities/Order";

export interface ICreateOrderDTO {
  user_id?: string;
  type: OrderType;
  done?: boolean;
  total?: number;
  payment: PaymentOrder;
}
