import { InstructionRequest } from './InstructionRequest';
import { IngredientRequest } from './IngredientRequest';

export interface RecipeRequest {
    title: string;
    description?: string;
    image: string;
    serving_size: number;
    preparation_time: string;
    ingredients: IngredientRequest[];
    instructions: InstructionRequest[];
}
