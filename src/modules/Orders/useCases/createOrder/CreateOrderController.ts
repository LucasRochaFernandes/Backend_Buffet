import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, payment } = request.body;
    const user_id = request.user_id;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    await createOrderUseCase.execute({ type, payment, user_id });

    return response.status(201).send();
  }
}
