import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(product_id: string): Promise<void> {
    const productExists = await this.inventoryRepository.getById(product_id);

    if (!productExists) {
      throw new AppError("Product not exists");
    }

    await this.inventoryRepository.deleteProduct(product_id);
  }
}
