import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductInInventoryUseCase } from "./CreateProductInInventoryUseCase";

export class CreateProductInInventoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, type, price } = request.body;

    const createProductInInventoryUseCase = container.resolve(
      CreateProductInInventoryUseCase
    );

    const product = await createProductInInventoryUseCase.execute({
      name,
      description,
      type,
      price,
    });

    return response.status(201).json(product);
  }
}
