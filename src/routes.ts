import { Router } from "express";
import { CreateRecipeController } from "./controllers/CreateRecipeController";
import { GetAllRecipesController } from "./controllers/GetAllRecipesController";

const routes = Router();

routes.post('/recipes', new CreateRecipeController().handle)
routes.get('/recipes', new GetAllRecipesController().handle)

export default routes;