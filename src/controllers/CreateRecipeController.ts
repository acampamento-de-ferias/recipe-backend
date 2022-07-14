import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { CreateRecipeService } from "../services/CreateRecipeService";

export class CreateRecipeController {

    async handle(request: Request, response: Response) {
        
        const service = new CreateRecipeService();

        const data = JSON.parse(request.body.data);
        data.image = request.file.filename;

        const result = await service.execute(data);

        if (result instanceof Recipe) {
            return response.status(201).json(result);
        }

        return response.status(400).json(result.message);
    }
}
