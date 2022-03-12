import { ICreateImageProduct } from "../dtos/ICreateImageProduct";
import { IDeleteImageDTO } from "../dtos/IDeleteImageDTO";
import { ProductImage } from "../infra/entities/ProductImage";

export interface IProductImagesRepository {
  create(data: ICreateImageProduct): Promise<void>;
  deleteImage(data: IDeleteImageDTO): Promise<void>;
  getImagesByProduct(product_id: string): Promise<ProductImage[]>;
}
