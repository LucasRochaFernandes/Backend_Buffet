import { ICreateOrderDTO } from "@modules/Orders/dtos/ICreateOrderDTO";
import { IOrderRepository } from "@modules/Orders/IRepositories/IOrderRepository";
import { IProductsOrderRepository } from "@modules/Orders/IRepositories/IProductsOrderRepository";
import { IUserRepository } from "@modules/User/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository,
    @inject("OrderRepository") private orderRepository: IOrderRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ type, payment, user_id }: ICreateOrderDTO): Promise<void> {
    const user = await this.userRepository.getById(user_id);

    if (!user) {
      throw new AppError("User not exists");
    }

    if (user.isAdmin) {
      await this.orderRepository.create({ type, payment, user_id });
    } else {
      const orderAlreadyExists = await this.orderRepository.getByUserId(
        user.id
      );

      if (orderAlreadyExists) {
        throw new AppError("Order already exists for this user");
      }
      await this.orderRepository.create({ type, payment, user_id });
    }
  }
}
