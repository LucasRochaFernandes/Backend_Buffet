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
  async getByName(name: string): Promise<Inventory> {
    return await this.repository.findOne({ name });
  }
  async getById(product_id: string): Promise<Inventory> {
    return await this.repository.findOne(product_id);
  }
  async list(data: IListInventoryDTO): Promise<Inventory[]> {
    const { type, maxPrice, name, available } = data;

    let products: Inventory[] = await this.repository.find();

    if (type) {
      products = products.filter((product) => product.type === type);
    }
    if (maxPrice) {
      products = products.filter((product) => product.price <= maxPrice);
    }
    if (available !== undefined) {
      products = products.filter((product) => product.available === available);
    }
    if (name) {
      products = products.filter((product) => product.name === name);
    }

    return products;
  }

  async create(data: ICreateInInventoryDTO): Promise<Inventory> {
    const newProduct = this.repository.create(data);
    return await this.repository.save(newProduct);
  }
  async changeProduct(data: IChangeInInventoryDTO): Promise<Inventory> {
    const {
      product_id,
      name,
      description,
      type,
      turnAvailable,
      price,
      amount_available,
    } = data;

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
    if (amount_available) {
      product.amount_available = amount_available;
    }

    return await this.repository.save(product);
  }
  async deleteProduct(product_id: string): Promise<void> {
    await this.repository.delete(product_id);
  }
}
