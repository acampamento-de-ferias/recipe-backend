import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";

export class GetAllRecipesService {

    private _recipeRepository: Repository<Recipe>;

    constructor() {
        this._recipeRepository = AppDataSource.getRepository(Recipe);
    }

    async execute(): Promise<Recipe[]> {
        return await this._recipeRepository.find({
            relations: {
                ingredients: true,
                instructions: true
            }
        });
    }

}