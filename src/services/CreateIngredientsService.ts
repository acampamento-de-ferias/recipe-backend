import { validate } from "class-validator";
import { EntityManager } from "typeorm";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";
import { IngredientRequest } from "../interfaces/IngredientRequest";

export class CreateIngredientService {

    async execute(ingredients: IngredientRequest[], recipe: Recipe, manager: EntityManager): Promise<Ingredient[]> {

        const ingredientsCreated = ingredients.map(async (ingredient: IngredientRequest) => {

            const ingredientModel = new Ingredient();
            ingredientModel.name = ingredient.name;
            ingredientModel.recipe_id = recipe.id;

            const errors = await validate(ingredientModel);
            if (errors.length > 0) {
                throw new Error (`Validation failed: ${errors}`)
            }

            await manager.save(ingredientModel);
            return ingredientModel;
        });
        
        return Promise.all(ingredientsCreated);
    }

}