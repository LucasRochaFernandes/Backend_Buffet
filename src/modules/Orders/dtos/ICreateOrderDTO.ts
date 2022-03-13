import { OrderType, PaymentOrder } from "../infra/entities/Order";

export interface ICreateOrderDTO {
  id?: string
  user_id?: string;
  type: OrderType;
  done?: boolean;
  total?: number;
  payment: PaymentOrder;
}
