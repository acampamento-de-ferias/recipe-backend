import { DeleteRecipeRepository } from "../repositories/DeleteRecipeRepository";

export class DeleteRecipeService {

    private _deleteRecipeRepository: DeleteRecipeRepository;

    constructor() {
        this._deleteRecipeRepository = new DeleteRecipeRepository();
    }

    async execute(id: number): Promise<void | Error> {
        return await this._deleteRecipeRepository.delete(id);
    }

}