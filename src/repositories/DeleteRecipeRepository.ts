import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";

export class DeleteRecipeRepository {

    private _recipeRepository: Repository<Recipe>;

    constructor() {
        this._recipeRepository = AppDataSource.getRepository(Recipe);
    }

    async delete(id: number): Promise<void | Error> {
        
        if (!await this._recipeRepository.findOneBy({id})) {
            return new Error("Recipe does not exists");
        }

        await this._recipeRepository.delete(id);
    }

}