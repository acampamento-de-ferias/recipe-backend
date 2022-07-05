import { Recipe } from "../entities/Recipe";
import { GetAllRecipesRepository } from "../repositories/GetAllRecipesRepository";

export class GetAllRecipesService {

    private _getAllRecipesRepository: GetAllRecipesRepository;

    constructor() {
        this._getAllRecipesRepository = new GetAllRecipesRepository();
    }

    async execute(): Promise<Recipe[]> {
        return await this._getAllRecipesRepository.getAll();
    }

}