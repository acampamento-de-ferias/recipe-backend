import { DeleteResult, Repository } from 'typeorm';
import AppDataSource from '../data-source';
import { Recipe } from '../entities/Recipe';

export class DeleteRecipeRepository {
  private recipeRepository: Repository<Recipe>;

  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
  }

  async delete(id: number): Promise<Error | DeleteResult> {
    if (!(await this.recipeRepository.findOneBy({ id }))) {
      return new Error('Recipe does not exists');
    }

    return this.recipeRepository.delete(id);
  }
}
