import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientService } from "./CreateIngredientService";
import { CreateInstructionService } from "./CreateInstructionService";

export class CreateRecipeService {

    private _recipeRepository: Repository<Recipe>;
    private _ingredientService: CreateIngredientService;
    private _instructionService: CreateInstructionService;

    constructor() {
        this._recipeRepository = AppDataSource.getRepository(Recipe);
        this._ingredientService = new CreateIngredientService();
        this._instructionService = new CreateInstructionService();
    }

    async execute({title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe> {

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();
        try {
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
    
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return recipe;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return e;
        }
        
    }

}