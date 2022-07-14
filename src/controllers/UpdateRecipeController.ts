import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { UpdateRecipeService } from "../services/UpdateRecipeService";

export class UpdateRecipeController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new UpdateRecipeService();

        const data = JSON.parse(request.body.data);
        data.image = request.file.filename;

        const result = await service.execute(parseInt(id), data);

        if (result instanceof Recipe) {
            return response.status(200).json(result);
        }

        return response.status(400).json(result.message);
    }
}
