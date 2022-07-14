import { QueryRunner } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { IngredientRequest } from "../interfaces/IngredientRequest";
import { InstructionRequest } from "../interfaces/InstructionRequest";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientRepository } from "../repositories/CreateIngredientRepository";
import { CreateInstructionRepository } from "../repositories/CreateInstructionRepository";
import { CreateRecipeRepository } from "../repositories/CreateRecipeRepository";
import { removeFile } from "../util";
export class CreateRecipeService {

    private createRecipeRepository: CreateRecipeRepository;
    private createIngredientRepository: CreateIngredientRepository;
    private createInstructionRepository: CreateInstructionRepository;
    private _queryRunner: QueryRunner;

    constructor() {
        this._queryRunner = AppDataSource.createQueryRunner();
        this.createRecipeRepository = new CreateRecipeRepository();
        this.createIngredientRepository = new CreateIngredientRepository();
        this.createInstructionRepository = new CreateInstructionRepository();
    }

    async execute(recipeRequest: RecipeRequest): Promise<Recipe | Error> {
        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        try {            
            // Create a new Recipe
            const recipe = await this.createRecipeRepository.create(recipeRequest, this._queryRunner.manager);
            
            // Create ingredients
            await Promise.all(recipeRequest.ingredients.map(async (ingredient: IngredientRequest) => {
                await this.createIngredientRepository.create(
                    ingredient, 
                    recipe, 
                    this._queryRunner.manager);
            }));

            // Create instructions
            await Promise.all(recipeRequest.instructions.map(async (instruction: InstructionRequest) => {
                await this.createInstructionRepository.create(
                    instruction, 
                    recipe, 
                    this._queryRunner.manager);
            }));

            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();

            return recipe;
        } catch (e) {
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            removeFile('/storage/uploads/' + recipeRequest.image);
            
            return new Error(e.message);
        }
    }

}