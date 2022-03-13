import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductOrderUseCase } from "./RemoveProductOrderUseCase";

export class RemoveProductOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;
    const { product_id } = request.body;

    const removeProductOrderUseCase = container.resolve(
      RemoveProductOrderUseCase
    );

    const orderProducts = await removeProductOrderUseCase.execute({
      product_id,
      order_id,
    });

    return response.json(orderProducts);
  }
}
