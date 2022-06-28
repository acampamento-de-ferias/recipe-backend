import { Request, Response } from "express";
import { DeleteRecipeService } from "../services/DeleteRecipeService";

export class DeleteRecipeController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteRecipeService();

        const result = await service.execute(parseInt(id));

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
