import { ProductImage } from "../infra/entities/ProductImage";

export interface IProductImagesRepository {
  create(file: string): Promise<ProductImage>;
}
