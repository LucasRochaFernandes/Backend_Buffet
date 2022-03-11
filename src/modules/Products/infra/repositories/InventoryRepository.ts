import { IChangeInInventoryDTO } from "@modules/Products/dtos/IChangeInInventoryDTO";
import { ICreateInInventoryDTO } from "@modules/Products/dtos/ICreateInInventoryDTO";
import { IListInventoryDTO } from "@modules/Products/dtos/IListInventoryDTO";
import { IInventoryRepository } from "@modules/Products/IRepositories/IInventoryRepository";
import { isDayjs } from "dayjs";
import { getRepository, InsertEvent, Repository } from "typeorm";
import { Inventory } from "../entities/Inventory";

export class InventoryRepository implements IInventoryRepository {
  private repository: Repository<Inventory>;

  constructor() {
    this.repository = getRepository(Inventory);
  }
  async list(data: IListInventoryDTO): Promise<Inventory[]> {
    const { type, maxPrice, name, available } = data;

    return await this.repository.find();
  }

  async create(data: ICreateInInventoryDTO): Promise<Inventory> {
    const newProduct = this.repository.create(data);
    return await this.repository.save(newProduct);
  }
  async changeProduct(data: IChangeInInventoryDTO): Promise<Inventory> {
    const { product_id, name, description, type, turnAvailable, price } = data;

    const product = await this.repository.findOne(product_id);

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (type) {
      product.type = type;
    }
    if (turnAvailable) {
      product.available = turnAvailable;
    }
    if (price) {
      product.price = price;
    }

    return await this.repository.save(product);
  }
  async deleteProduct(product_id: string): Promise<void> {
    await this.repository.delete(product_id);
  }
}
