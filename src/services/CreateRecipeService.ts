import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { CreateInstructionService } from "./CreateInstructionService";
import { CreateIngredientService } from "./CreateIngredientService";

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

    private _recipeRepository;
    private _ingredientService;
    private _instructionService;


    constructor() {
        this._recipeRepository = AppDataSource.getRepository(Recipe);
        this._ingredientService = new CreateIngredientService();
        this._instructionService = new CreateInstructionService();
    }

    async execute({title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe> {

        const recipe = this._recipeRepository.create({
            title,
            description,
            image,
            serving_size,
            preparation_time
        }); 

        await this._recipeRepository.save(recipe);

        await this._ingredientService.executeMany(ingredients, recipe);
        await this._instructionService.executeMany(instructions, recipe);

        return recipe;
    }

}