import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { Recipe } from '../entities/Recipe';
import { RecipeRequest } from '../interfaces/RecipeRequest';

export class CreateRecipeRepository {
    async create(
        {
            title,
            description,
            image,
            serving_size,
            preparation_time
        }: RecipeRequest,
        manager: EntityManager
    ): Promise<Recipe> {
        const recipe = new Recipe();
        recipe.title = title;
        recipe.description = description;
        recipe.image = image;
        recipe.serving_size = serving_size;
        recipe.preparation_time = preparation_time;

        const errors = await validate(recipe);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors}`);
        }

        await manager.save(recipe);
        return recipe;
    }
}
