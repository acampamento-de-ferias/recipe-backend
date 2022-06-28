import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { UpdateRecipeService } from "../services/UpdateRecipeService";

export class UpdateRecipeController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new UpdateRecipeService();

        const result = await service.execute(parseInt(id), request.body);

        if (result instanceof Recipe) {
            return response.status(200).json(result);
        }

        return response.status(400).json(result.message);
    }
}
