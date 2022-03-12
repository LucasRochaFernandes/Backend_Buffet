import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportImagesUseCase } from "./ImportImagesUseCase";

interface IFiles {
  filename: string;
}

export class ImportImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const images = request.files as IFiles[];
    const filenames = images.map((file) => file.filename);

    const importImagesUseCase = container.resolve(ImportImagesUseCase);

    await importImagesUseCase.execute({
      product_id,
      images: filenames,
    });

    return response.status(204).send();
  }
}
