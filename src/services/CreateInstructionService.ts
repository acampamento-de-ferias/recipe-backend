import AppDataSource from "../data-source";
import { Instruction } from "../entities/Instruction";
import { Recipe } from "../entities/Recipe";

interface InstructionRequest {
    name: string
};

export class CreateInstructionService {

    /**
     * Register Intructions
     *  
     */
    async executeMany(instructions: Array<InstructionRequest>, recipe: Recipe): Promise<void> {
        const instructionRepository = AppDataSource.getRepository(Instruction);

        instructions.map(async (instruction: InstructionRequest) => {
            const instructionModel = instructionRepository.create({
                name: instruction.name,
                recipe_id: recipe.id
            });

            await instructionRepository.save(instructionModel);
        });

    }

}