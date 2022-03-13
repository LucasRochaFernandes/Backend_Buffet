import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddProductOrderUseCase } from "./AddProductOrderUseCase";

export class AddProductOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const { order_id } = request.params;
    const { product_amount } = request.body;

    const addProductOrderUseCase = container.resolve(AddProductOrderUseCase);

    const productsOrder = await addProductOrderUseCase.execute({
      product_id,
      order_id,
      product_amount,
    });

    return response.status(204).json(productsOrder);
  }
}
