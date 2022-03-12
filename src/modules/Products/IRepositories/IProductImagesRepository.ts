import { ICreateImageProduct } from "../dtos/ICreateImageProduct";
import { ProductImage } from "../infra/entities/ProductImage";

export interface IProductImagesRepository {
  create(data: ICreateImageProduct): Promise<void>;
}
