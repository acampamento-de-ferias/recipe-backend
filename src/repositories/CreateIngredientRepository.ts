import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { Ingredient } from '../entities/Ingredient';
import { Recipe } from '../entities/Recipe';
import { IngredientRequest } from '../interfaces/IngredientRequest';

export class CreateIngredientRepository {
    async create(
        ingredientRequest: IngredientRequest,
        recipe: Recipe,
        manager: EntityManager
    ): Promise<Ingredient> {
        const ingredient = new Ingredient();
        ingredient.name = ingredientRequest.name;
        ingredient.recipe_id = recipe.id;

        const errors = await validate(ingredient);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors}`);
        }

        await manager.save(ingredient);
        return ingredient;
    }
}
