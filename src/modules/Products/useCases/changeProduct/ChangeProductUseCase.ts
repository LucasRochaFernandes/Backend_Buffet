import { IChangeInInventoryDTO } from "@modules/Products/dtos/IChangeInInventoryDTO";
import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeProductUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: IChangeInInventoryDTO): Promise<Inventory> {
    const { product_id } = data;

    const productExists = await this.inventoryRepository.getById(product_id);

    if (!productExists) {
      throw new AppError("Product not exists");
    }

    return await this.inventoryRepository.changeProduct(data);
  }
}
