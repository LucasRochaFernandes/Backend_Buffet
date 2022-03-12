import { ICreateImageProduct } from "@modules/Products/dtos/ICreateImageProduct";
import { IProductImagesRepository } from "@modules/Products/IRepositories/IProductImagesRepository";
import { getRepository, Repository } from "typeorm";
import { ProductImage } from "../entities/ProductImage";
import { v4 as uuidV4 } from "uuid";

export class ImageProductRepository implements IProductImagesRepository {
  private repository: Repository<ProductImage>;

  constructor() {
    this.repository = getRepository(ProductImage);
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
