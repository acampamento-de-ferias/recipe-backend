import { Recipe } from '../entities/Recipe';
import { GetAllRecipesRepository } from '../repositories/GetAllRecipesRepository';

export class GetAllRecipesService {
  private getAllRecipesRepository: GetAllRecipesRepository;

  constructor() {
    this.getAllRecipesRepository = new GetAllRecipesRepository();
  }

  async execute(): Promise<Recipe[]> {
    return this.getAllRecipesRepository.getAll();
  }
}
