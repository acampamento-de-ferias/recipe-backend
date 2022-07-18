import { Request, Response } from 'express';
import { GetAllRecipesService } from '../services/GetAllRecipesService';

export class GetAllRecipesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllRecipesService();
    const recipes = await service.execute();
    return response.status(200).json(recipes);
  }
}
