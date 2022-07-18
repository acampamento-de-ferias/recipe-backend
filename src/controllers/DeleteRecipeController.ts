import { Request, Response } from 'express';
import { DeleteRecipeService } from '../services/DeleteRecipeService';

export class DeleteRecipeController {
  async handle(request: Request, response: Response) {
    const service = new DeleteRecipeService();
    const { id } = request.params;

    const result = await service.execute(parseInt(id, 10));

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}
