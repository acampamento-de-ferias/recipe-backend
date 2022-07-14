import { QueryRunner } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { IngredientRequest } from "../interfaces/IngredientRequest";
import { InstructionRequest } from "../interfaces/InstructionRequest";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientRepository } from "../repositories/CreateIngredientRepository";
import { CreateInstructionRepository } from "../repositories/CreateInstructionRepository";
import { DeleteIngredientRepository } from "../repositories/DeleteIngredientRepository";
import { DeleteInstructionRepository } from "../repositories/DeleteInstructionRepository";
import { UpdateRecipeRepository } from "../repositories/UpdateRecipeRepository";
import { removeFile } from "../util";
export class UpdateRecipeService {

    private _updateRecipeRepository: UpdateRecipeRepository;
    private _createIngredientRepository: CreateIngredientRepository;
    private _createInstructionRepository: CreateInstructionRepository;
    private _deleteIngredientRepository: DeleteIngredientRepository;
    private _deleteInstructionRepository: DeleteInstructionRepository;
    private _queryRunner: QueryRunner;

    constructor() {
        this._queryRunner = AppDataSource.createQueryRunner();
        this._updateRecipeRepository = new UpdateRecipeRepository();
        this._createIngredientRepository = new CreateIngredientRepository();
        this._createInstructionRepository = new CreateInstructionRepository();
        this._deleteIngredientRepository = new DeleteIngredientRepository();
        this._deleteInstructionRepository = new DeleteInstructionRepository();
    }

    async execute(id: number, recipeRequest: RecipeRequest): Promise<Recipe | Error> {
        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        try {
            const recipeToUpdate = await this._updateRecipeRepository.update(id, recipeRequest, this._queryRunner.manager);

            // Delete olders ingredients
            await this._deleteIngredientRepository.deleteIngredientsByRecipe(recipeToUpdate, this._queryRunner.manager);

            // Delete olders instructions
            await this._deleteInstructionRepository.deleteInstructionsByRecipe(recipeToUpdate, this._queryRunner.manager);

            // Create ingredients
            await Promise.all(recipeRequest.ingredients.map(async (ingredient: IngredientRequest) => {
                await this._createIngredientRepository.create(
                    ingredient, 
                    recipeToUpdate, 
                    this._queryRunner.manager);
            }));

            // Create instructions
            await Promise.all(recipeRequest.instructions.map(async (instruction: InstructionRequest) => {
                await this._createInstructionRepository.create(
                    instruction, 
                    recipeToUpdate, 
                    this._queryRunner.manager);
            }));

            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();

            return recipeToUpdate;        
        } catch (e) {
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            removeFile('/storage/uploads/' + recipeRequest.image);

            return new Error(e.message);
        }
    }

}