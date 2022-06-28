import { EntityManager } from "typeorm";
import { Instruction } from "../entities/Instruction";
import { Recipe } from "../entities/Recipe";

export class DeleteInstructionsService {

    /**
     * Delete many Instructions by Recipe
     *  
     */
     async execute(recipe: Recipe, manager: EntityManager): Promise<void> {
        await manager
                .createQueryBuilder()
                .delete()
                .from(Instruction)
                .where("recipe_id = :recipe_id", {recipe_id: recipe.id})
                .execute();
    }

}