import { IListInventoryDTO } from "@modules/Products/dtos/IListInventoryDTO";
import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListInventoryUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}
  async execute(data: IListInventoryDTO): Promise<Inventory[]> {
    return await this.inventoryRepository.list(data);
  }
}
