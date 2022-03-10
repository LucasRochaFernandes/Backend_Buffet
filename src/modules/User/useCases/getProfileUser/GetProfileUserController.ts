import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProfileUserUseCase } from "./GetProfileUserUseCase";

export class GetProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    const getProfileUserUseCase = container.resolve(GetProfileUserUseCase);

    const userProfile = await getProfileUserUseCase.execute(username);

    return response.json(userProfile);
  }
}
