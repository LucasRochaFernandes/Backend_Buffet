import { IChangeInInventoryDTO } from "@modules/Products/dtos/IChangeInInventoryDTO";
import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeProductUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: IChangeInInventoryDTO): Promise<Inventory> {
    return await this.inventoryRepository.changeProduct(data);
  }
}
