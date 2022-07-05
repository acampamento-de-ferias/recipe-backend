import { EntityManager, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";

export class DeleteIngredientRepository {

    private _ingredientRepository: Repository<Ingredient>;

    constructor() {
        this._ingredientRepository = AppDataSource.getRepository(Ingredient);
    }

    async delete(id: number) {
        if (!await this._ingredientRepository.findOneBy({id})) {
            return new Error("Recipe does not exists");
        }

        await this._ingredientRepository.delete(id);
    }

    async deleteIngredientsByRecipe(recipe: Recipe, manager: EntityManager): Promise<void> {
        await manager
                .createQueryBuilder()
                .delete()
                .from(Ingredient)
                .where("recipe_id = :recipe_id", {recipe_id: recipe.id})
                .execute();

    }

}