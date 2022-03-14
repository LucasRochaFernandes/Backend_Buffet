import { Request, Response } from "express";
import { container } from "tsyringe";
import { FinishedOrderUseCase } from "./FinishedOrderUseCase";

export class FinishedOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const finishedOrderUseCase = container.resolve(FinishedOrderUseCase);

    await finishedOrderUseCase.execute(order_id);

    return response.send();
  }
}
