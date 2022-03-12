import { IDeleteImageDTO } from "@modules/Products/dtos/IDeleteImageDTO";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteImageUseCase {
  constructor(
    @inject("ProductImageRepository")
    private imageProductRepository: IProductImagesRepository,
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: IDeleteImageDTO): Promise<void> {
    const { product_id } = data;

    const productExists = await this.inventoryRepository.getById(product_id);

    if (!productExists) {
      throw new AppError("Product not exits");
    }

    await this.imageProductRepository.deleteImage(data);
  }
}
