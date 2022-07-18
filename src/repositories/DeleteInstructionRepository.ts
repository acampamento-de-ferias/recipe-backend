import { DeleteResult, EntityManager, Repository } from 'typeorm';
import AppDataSource from '../data-source';
import { Ingredient } from '../entities/Ingredient';
import { Instruction } from '../entities/Instruction';
import { Recipe } from '../entities/Recipe';

export class DeleteInstructionRepository {
    private instructionRepository: Repository<Instruction>;

    constructor() {
        this.instructionRepository = AppDataSource.getRepository(Instruction);
    }

    async delete(id: number): Promise<Error | DeleteResult> {
        if (!(await this.instructionRepository.findOneBy({ id }))) {
            return new Error('Recipe does not exists');
        }

        return this.instructionRepository.delete(id);
    }

    async deleteInstructionsByRecipe(
        recipe: Recipe,
        manager: EntityManager
    ): Promise<void> {
        await manager
            .createQueryBuilder()
            .delete()
            .from(Ingredient)
            .where('recipe_id = :recipe_id', { recipe_id: recipe.id })
            .execute();
    }
}
