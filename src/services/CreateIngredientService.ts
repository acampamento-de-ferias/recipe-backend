import AppDataSource from "../data-source";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";

interface IngredientRequest {
    name: string
};

export class CreateIngredientService {

    /**
     * Register many Ingredients
     *  
     */
    async executeMany(ingredients: Array<IngredientRequest>, recipe: Recipe): Promise<void> {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        ingredients.map(async (ingredient: IngredientRequest) => {
            const ingredientModel = ingredientRepository.create({
                name: ingredient.name,
                recipe_id: recipe.id
            });

            await ingredientRepository.save(ingredientModel);
        });

    }

}