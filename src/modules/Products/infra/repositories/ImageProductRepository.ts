import { ICreateImageProduct } from "@modules/Products/dtos/ICreateImageProduct";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { getRepository, Repository } from "typeorm";
import { ProductImage } from "../entities/ProductImage";
import { IDeleteImageDTO } from "@modules/Products/dtos/IDeleteImageDTO";

export class ImageProductRepository implements IProductImagesRepository {
  private repository: Repository<ProductImage>;

  constructor() {
    this.repository = getRepository(ProductImage);
  }
  async getImagesByProduct(product_id: string): Promise<ProductImage[]> {
    return await this.repository.find({ product_id });
  }
  async deleteImage({ product_id, filename }: IDeleteImageDTO): Promise<void> {
    await this.repository.delete({ product_id: product_id, image: filename });
  }

  async create(data: ICreateImageProduct): Promise<void> {
    const { images, product_id } = data;

    let imagesProduct: ProductImage[] = [];

    for (const image of images) {
      const newImage = new ProductImage();
      newImage.image = image;
      newImage.product_id = product_id;
      imagesProduct.push(newImage);
    }

    await this.repository.save(imagesProduct);
  }
}
