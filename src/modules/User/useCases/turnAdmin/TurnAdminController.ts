import { Request, Response } from "express";
import { container } from "tsyringe";
import { TurnAdminUseCase } from "./TurnAdminUseCase";

export class TurnAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { turnAdmin } = request.body;

    const turnAdminUseCase = container.resolve(TurnAdminUseCase);

    await turnAdminUseCase.execute({ user_id, turnAdmin });

    return response.status(204).send();
  }
}
