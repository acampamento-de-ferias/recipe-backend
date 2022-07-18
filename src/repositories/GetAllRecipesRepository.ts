import { Repository } from 'typeorm';
import AppDataSource from '../data-source';
import { Recipe } from '../entities/Recipe';

export class GetAllRecipesRepository {
  private recipeRepository: Repository<Recipe>;

  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
  }

  async getAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: {
        ingredients: true,
        instructions: true,
      },
    });
  }
}
