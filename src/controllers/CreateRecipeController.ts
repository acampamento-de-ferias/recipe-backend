import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { CreateRecipeService } from "../services/CreateRecipeService";

export class CreateRecipeController {

    async handle(request: Request, response: Response) {
        
        const service = new CreateRecipeService();

        const result = await service.execute(request.body);

        if (result instanceof Recipe) {
            return response.status(200).json(result);
        }

        return response.status(400).json(result.message);
    }
}
