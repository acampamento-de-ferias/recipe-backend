import { QueryRunner } from 'typeorm';
import AppDataSource from '../data-source';
import { Recipe } from '../entities/Recipe';
import { IngredientRequest } from '../interfaces/IngredientRequest';
import { InstructionRequest } from '../interfaces/InstructionRequest';
import { RecipeRequest } from '../interfaces/RecipeRequest';
import { CreateIngredientRepository } from '../repositories/CreateIngredientRepository';
import { CreateInstructionRepository } from '../repositories/CreateInstructionRepository';
import { DeleteIngredientRepository } from '../repositories/DeleteIngredientRepository';
import { DeleteInstructionRepository } from '../repositories/DeleteInstructionRepository';
import { UpdateRecipeRepository } from '../repositories/UpdateRecipeRepository';
import { removeFile } from '../util';

export class UpdateRecipeService {
  private updateRecipeRepository: UpdateRecipeRepository;

  private createIngredientRepository: CreateIngredientRepository;

  private createInstructionRepository: CreateInstructionRepository;

  private deleteIngredientRepository: DeleteIngredientRepository;

  private deleteInstructionRepository: DeleteInstructionRepository;

  private queryRunner: QueryRunner;

  constructor() {
    this.queryRunner = AppDataSource.createQueryRunner();
    this.updateRecipeRepository = new UpdateRecipeRepository();
    this.createIngredientRepository = new CreateIngredientRepository();
    this.createInstructionRepository = new CreateInstructionRepository();
    this.deleteIngredientRepository = new DeleteIngredientRepository();
    this.deleteInstructionRepository = new DeleteInstructionRepository();
  }

  async execute(
    id: number,
    recipeRequest: RecipeRequest,
  ): Promise<Recipe | Error> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const recipeToUpdate = await this.updateRecipeRepository.update(
        id,
        recipeRequest,
        this.queryRunner.manager,
      );

      // Delete olders ingredients
      await this.deleteIngredientRepository.deleteIngredientsByRecipe(
        recipeToUpdate,
        this.queryRunner.manager,
      );

      // Delete olders instructions
      await this.deleteInstructionRepository.deleteInstructionsByRecipe(
        recipeToUpdate,
        this.queryRunner.manager,
      );

      // Create ingredients
      await Promise.all(
        recipeRequest.ingredients.map(async (ingredient: IngredientRequest) => {
          await this.createIngredientRepository.create(
            ingredient,
            recipeToUpdate,
            this.queryRunner.manager,
          );
        }),
      );

      // Create instructions
      await Promise.all(
        recipeRequest.instructions.map(
          async (instruction: InstructionRequest) => {
            await this.createInstructionRepository.create(
              instruction,
              recipeToUpdate,
              this.queryRunner.manager,
            );
          },
        ),
      );

      await this.queryRunner.commitTransaction();
      await this.queryRunner.release();

      return recipeToUpdate;
    } catch (e) {
      await this.queryRunner.rollbackTransaction();
      await this.queryRunner.release();
      removeFile(`/storage/uploads/${recipeRequest.image}`);

      return new Error(e.message);
    }
  }
}
