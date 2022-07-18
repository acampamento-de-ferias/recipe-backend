import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { Instruction } from '../entities/Instruction';
import { Recipe } from '../entities/Recipe';
import { InstructionRequest } from '../interfaces/InstructionRequest';

export class CreateInstructionRepository {
  async create(
    instructionRequest: InstructionRequest,
    recipe: Recipe,
    manager: EntityManager,
  ): Promise<Instruction> {
    const instruction = new Instruction();
    instruction.name = instructionRequest.name;
    instruction.recipe_id = recipe.id;

    const errors = await validate(instruction);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors}`);
    }

    await manager.save(instruction);
    return instruction;
  }
}
