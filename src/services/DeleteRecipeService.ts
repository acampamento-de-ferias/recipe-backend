import { DeleteResult } from 'typeorm';
import { DeleteRecipeRepository } from '../repositories/DeleteRecipeRepository';

export class DeleteRecipeService {
    private deleteRecipeRepository: DeleteRecipeRepository;

    constructor() {
        this.deleteRecipeRepository = new DeleteRecipeRepository();
    }

    async execute(id: number): Promise<Error | DeleteResult> {
        return this.deleteRecipeRepository.delete(id);
    }
}
