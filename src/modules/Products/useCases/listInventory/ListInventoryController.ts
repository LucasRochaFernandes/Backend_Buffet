import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListInventoryUseCase } from "./ListInventoryUseCase";

export class ListInventoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, maxPrice, name, available } = request.body;

    const listInventoryUseCase = container.resolve(ListInventoryUseCase);

    const product = await listInventoryUseCase.execute({
      type,
      maxPrice,
      name,
      available,
    });

    return response.json(product);
  }
}
