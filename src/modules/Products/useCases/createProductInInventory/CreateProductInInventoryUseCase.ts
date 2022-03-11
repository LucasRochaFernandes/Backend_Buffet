import { ICreateInInventoryDTO } from "@modules/Products/dtos/ICreateInInventoryDTO";
import { Inventory } from "@modules/Products/infra/entities/Inventory";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateProductInInventoryUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: ICreateInInventoryDTO): Promise<Inventory> {
    const { name } = data;

    const nameAlreadyExists = await this.inventoryRepository.getByName(name);

    if (nameAlreadyExists) {
      throw new AppError("Name already exits");
    }

    return await this.inventoryRepository.create(data);
  }
}
