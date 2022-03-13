import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, payment } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    await createOrderUseCase.execute({ type, payment });

    return response.status(201).send();
  }
}
