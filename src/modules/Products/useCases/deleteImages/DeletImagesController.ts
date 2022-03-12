import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteImageUseCase } from "./DeleteImageUseCase";

export class DeleteImagesProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename, product_id } = request.params;

    const deleteImageUseCase = container.resolve(DeleteImageUseCase);

    await deleteImageUseCase.execute({ filename, product_id });

    return response.send();
  }
}
