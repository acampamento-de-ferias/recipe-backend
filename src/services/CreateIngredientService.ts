import { validate } from "class-validator";
import AppDataSource from "../data-source";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";
import { IngredientRequest } from "../interfaces/IngredientRequest";

export class CreateIngredientService {

    /**
     * Register many Ingredients
     *  
     */
    async executeMany(ingredients: Array<IngredientRequest>, recipe: Recipe): Promise<Ingredient[]> {

        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        const ingredientsCreated = ingredients.map(async (ingredient: IngredientRequest) => {
            const ingredientModel = ingredientRepository.create({
                name: ingredient.name,
                recipe_id: recipe.id
            });

            const errors = await validate(ingredientModel);
            if (errors.length > 0) {
                throw new Error (`Validation failed: ${errors}`)
            }

            await ingredientRepository.save(ingredientModel);
            return ingredientModel;
        });
        
        return Promise.all(ingredientsCreated);
    }

}