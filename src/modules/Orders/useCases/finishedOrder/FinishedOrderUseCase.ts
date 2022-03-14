import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export class FinishedOrderUseCase {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(order_id: string): Promise<void> {
    const order = await this.orderRepository.getById(order_id);
    order.finished_at = this.dateProvider.dateNow();
    order.done = true;
    await this.orderRepository.create(order);
  }
}
