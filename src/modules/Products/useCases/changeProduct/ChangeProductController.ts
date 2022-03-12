import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeProductUseCase } from "./ChangeProductUseCase";

export class ChangeProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, type, price, available, amount } = request.body;
    const { product_id } = request.params;

    const changeProductUseCase = container.resolve(ChangeProductUseCase);

    const productChanged = await changeProductUseCase.execute({
      name,
      description,
      type,
      price,
      turnAvailable: available,
      product_id,
      amount_available: amount,
    });

    return response.json(productChanged);
  }
}
