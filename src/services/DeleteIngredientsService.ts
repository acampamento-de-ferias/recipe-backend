import { EntityManager } from "typeorm";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";

export class DeleteIngredientsService {

    /**
     * Delete many Ingredients by Recipe
     *  
     */
    async execute(recipe: Recipe, manager: EntityManager): Promise<void> {
        await manager
                .createQueryBuilder()
                .delete()
                .from(Ingredient)
                .where("recipe_id = :recipe_id", {recipe_id: recipe.id})
                .execute();
    }

}