import { validate } from "class-validator";
import { EntityManager } from "typeorm";
import { Recipe } from "../entities/Recipe";
import { RecipeRequest } from "../interfaces/RecipeRequest";

export class UpdateRecipeRepository {

    async update(id: number, {title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest, manager: EntityManager): Promise<Recipe> {

        const recipeToUpdate = await manager.findOneBy(Recipe, {id});
        if (!recipeToUpdate) {
            throw new Error(`Recipe does not exists.`);
        }

        recipeToUpdate.title = title;
        recipeToUpdate.description = description;
        recipeToUpdate.image = image;
        recipeToUpdate.serving_size = serving_size;
        recipeToUpdate.preparation_time = preparation_time;

        const errors = await validate(recipeToUpdate);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors}`)
        }

        await manager.save(recipeToUpdate);
        return recipeToUpdate;        
    }

}