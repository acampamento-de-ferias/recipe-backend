import { validate } from "class-validator";
import { QueryRunner } from "typeorm";
import AppDataSource from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeRequest } from "../interfaces/RecipeRequest";
import { CreateIngredientService } from "./CreateIngredientsService";
import { CreateInstructionService } from "./CreateInstructionsService";
import { DeleteIngredientsService } from "./DeleteIngredientsService";
import { DeleteInstructionsService } from "./DeleteInstructionsService";

export class UpdateRecipeService {

    private _createIngredientsService: CreateIngredientService;
    private _createInstructionsService: CreateInstructionService;
    private _deleteIngredientsService: DeleteIngredientsService;
    private _deleteInstructionsService: DeleteInstructionsService;
    private _queryRunner: QueryRunner;

    constructor() {
        this._queryRunner = AppDataSource.createQueryRunner();
        this._createIngredientsService = new CreateIngredientService();
        this._createInstructionsService = new CreateInstructionService();
        this._deleteIngredientsService = new DeleteIngredientsService();
        this._deleteInstructionsService = new DeleteInstructionsService();
    }

    async execute(id: number, {title, description, image, serving_size, preparation_time, ingredients, instructions}: RecipeRequest): Promise<Recipe | Error> {
        
        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        try {
            const recipeToUpdate = await this._queryRunner.manager.findOneBy(Recipe, {id});
            if (!recipeToUpdate) {
                throw new Error(`Recipe does not exists.`);
            }

            recipeToUpdate.title = title;
            recipeToUpdate.description = description;
            recipeToUpdate.image = image;
            recipeToUpdate.serving_size = serving_size;
            recipeToUpdate.preparation_time = preparation_time;
 
            const errors = await validate(recipeToUpdate);
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors}`)
            }
    
            await this._queryRunner.manager.save(recipeToUpdate);
    
            await this._deleteIngredientsService.execute(recipeToUpdate, this._queryRunner.manager);
            await this._createIngredientsService.execute(ingredients, recipeToUpdate, this._queryRunner.manager);

            await this._deleteInstructionsService.execute(recipeToUpdate, this._queryRunner.manager);
            await this._createInstructionsService.execute(instructions, recipeToUpdate, this._queryRunner.manager);
            
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
            return recipeToUpdate;        
        } catch (e) {
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            return new Error(e.message);
        }
    }

}