import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "src/utils/DeleteFile";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("InventoryRepository")
    private inventoryRepository: IInventoryRepository,
    @inject("ProductImageRepository")
    private imageProductRepository: IProductImagesRepository
  ) {}

  async execute(product_id: string): Promise<void> {
    const productExists = await this.inventoryRepository.getById(product_id);

    if (!productExists) {
      throw new AppError("Product not exists");
    }

    const images = await this.imageProductRepository.getImagesByProduct(
      product_id
    );

    images.map(async (image) => {
      await deleteFile(`./tmp/products/${image.image}`);
    });

    await this.inventoryRepository.deleteProduct(product_id);
  }
}
