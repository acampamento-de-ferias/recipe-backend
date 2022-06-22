import AppDataSource from "../data-source";
import { Recipe } from "../entity/Recipe";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/Instruction";

interface IngredientRequest {
    name: string
};

interface InstructionRequest {
    name: string
};

interface RecipeRequest {
    title: string;
    description?: string;
    image: string;
    serving_size: number;
    preparation_time: string;
    ingredients: Array<IngredientRequest>;
    instructions: Array<InstructionRequest>;
};

export class CreateRecipeService {

    async execute({title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe> {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const instructionRepository = AppDataSource.getRepository(Instruction);

        const recipe = recipeRepository.create({
            title,
            description,
            image,
            serving_size,
            preparation_time
        }); 

        await recipeRepository.save(recipe);

        ingredients.map(async (ingredient: IngredientRequest) => {
            const ingredientModel = ingredientRepository.create({
                name: ingredient.name,
                recipe_id: recipe.id
            });

            await ingredientRepository.save(ingredientModel);
        });

        instructions.map(async (instruction: InstructionRequest) => {
            const instructionModel = ingredientRepository.create({
                name: instruction.name,
                recipe_id: recipe.id
            });

            await instructionRepository.save(instructionModel);
        });

        return recipe;
    }

}