import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(product_id: string): Promise<void> {
    await this.inventoryRepository.deleteProduct(product_id);
  }
}
