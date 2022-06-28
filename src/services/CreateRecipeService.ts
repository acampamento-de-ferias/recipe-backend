import { validate } from "class-validator";
import { QueryRunner, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientService } from "./CreateIngredientService";
import { CreateInstructionService } from "./CreateInstructionService";

export class CreateRecipeService {

    private _recipeRepository: Repository<Recipe>;
    private _ingredientService: CreateIngredientService;
    private _instructionService: CreateInstructionService;
    private _queryRunner: QueryRunner;

    constructor() {
        this._recipeRepository = AppDataSource.getRepository(Recipe);
        this._queryRunner = AppDataSource.createQueryRunner();
        this._ingredientService = new CreateIngredientService();
        this._instructionService = new CreateInstructionService();
    }

    async execute({title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe | Error> {
        
        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        try {
            const recipe = this._recipeRepository.create({
                title,
                description,
                image,
                serving_size,
                preparation_time,
                instructions, // only for validation, it doesn't save here
                ingredients // only for validation, it doesn't save here
            }); 
    
            const errors = await validate(recipe);
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors}`)
            }
    
            await this._queryRunner.manager.save(recipe);
    
            await this._ingredientService.executeMany(ingredients, recipe, this._queryRunner.manager);
            await this._instructionService.executeMany(instructions, recipe, this._queryRunner.manager);
            
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
            return recipe;        
        } catch (e) {
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            return new Error(e.message);
        }
    }

}