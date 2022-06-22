import { Request, Response } from "express";
import { CreateRecipeService } from "../services/CreateRecipeService";

export class CreateRecipeController {

    async handle(request: Request, response: Response) {
        
        const service = new CreateRecipeService();

        const recipe = service.execute(request.body);

        return response.status(200).json(recipe)
    }
}
