import { validate } from "class-validator";
import AppDataSource from "../data-source";
import { Instruction } from "../entities/Instruction";
import { Recipe } from "../entities/Recipe";
import { InstructionRequest } from "../interfaces/InstructionRequest";

export class CreateInstructionService {

    /**
     * Register Intructions
     *  
     */
    async executeMany(instructions: Array<InstructionRequest>, recipe: Recipe): Promise<Instruction[]> {
        
        const instructionRepository = AppDataSource.getRepository(Instruction);

        const instructionsCreated = instructions.map(async (instruction: InstructionRequest) => {
            const instructionModel = instructionRepository.create({
                name: instruction.name,
                recipe_id: recipe.id
            });

            const errors = await validate(instructionModel);
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors}`)
            }

            await instructionRepository.save(instructionModel);
            return instructionModel;
        });

        return Promise.all(instructionsCreated);
    }

}