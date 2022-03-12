import { ICreateImageProduct } from "../dtos/ICreateImageProduct";
import { IDeleteImageDTO } from "../dtos/IDeleteImageDTO";

export interface IProductImagesRepository {
  create(data: ICreateImageProduct): Promise<void>;
  deleteImage(data: IDeleteImageDTO): Promise<void>;
}
