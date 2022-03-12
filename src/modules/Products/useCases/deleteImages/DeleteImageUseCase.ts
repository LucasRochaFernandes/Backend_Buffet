import { IDeleteImageDTO } from "@modules/Products/dtos/IDeleteImageDTO";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteImageUseCase {
  constructor(
    @inject("ProductImageRepository")
    private imageProductRepository: IProductImagesRepository
  ) {}

  async execute(data: IDeleteImageDTO): Promise<void> {
    
  }
}
