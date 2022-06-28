import { validate } from "class-validator";
import { QueryRunner } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientService } from "./CreateIngredientsService";
import { CreateInstructionService } from "./CreateInstructionsService";

export class CreateRecipeService {

    private _createIngredientsService: CreateIngredientService;
    private _createInstructionsService: CreateInstructionService;
    private _queryRunner: QueryRunner;

    constructor() {
        this._queryRunner = AppDataSource.createQueryRunner();
        this._createIngredientsService = new CreateIngredientService();
        this._createInstructionsService = new CreateInstructionService();
    }

    async execute({title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe | Error> {
        
        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        try {
            const recipe = new Recipe();
            recipe.title = title;
            recipe.description = description;
            recipe.image = image;
            recipe.serving_size = serving_size;
            recipe.preparation_time = preparation_time;

            const errors = await validate(recipe);
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors}`)
            }
    
            await this._queryRunner.manager.save(recipe);
            await this._createIngredientsService.execute(ingredients, recipe, this._queryRunner.manager);
            await this._createInstructionsService.execute(instructions, recipe, this._queryRunner.manager);
            
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