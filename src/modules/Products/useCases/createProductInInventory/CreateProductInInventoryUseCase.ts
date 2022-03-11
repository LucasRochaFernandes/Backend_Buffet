import { ICreateInInventoryDTO } from "@modules/Products/dtos/ICreateInInventoryDTO";
import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateProductInInventoryUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: ICreateInInventoryDTO): Promise<Inventory> {
    return await this.inventoryRepository.create(data);
  }
}
