import { ICreateImageProduct } from "@modules/Products/dtos/ICreateImageProduct";
import { ProductImage } from "@modules/Products/infra/entities/ProductImage";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ImportImagesUseCase {
  constructor(
    @inject("ProductImageRepository")
    private imageProductRepository: IProductImagesRepository,
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(data: ICreateImageProduct): Promise<void> {
    const { product_id } = data;

    const productExists = await this.inventoryRepository.getById(product_id);

    if (!productExists) {
      throw new AppError("Product Not Exits");
    }

   await this.imageProductRepository.create(data);
  }
}
